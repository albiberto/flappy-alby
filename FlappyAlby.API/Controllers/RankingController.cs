namespace FlappyAlby.API.Controllers;

using Domain;
using DTOs;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class RankingController : ControllerBase
{
    private readonly FlappyAlbyContext _context;
    private readonly ILogger<RankingController> _logger;

    public RankingController(FlappyAlbyContext context, ILogger<RankingController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var ranking = await _context.Ranking
            .Include(r => r.Player)
            .OrderBy(s => s.Total)
            .Take(5)
            .Select(s => new ScoreDto(s.PlayerName, s.Total))
            .ToListAsync();

        return Ok(ranking);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ScoreDto scoreDto)
    {
        try
        {
            var player = _context.Players.SingleOrDefault(p => p.Name == scoreDto.PlayerName);
            var id = player?.Id;

            if (id is null)
            {
                var added = await _context.Players.AddAsync(new Player(scoreDto.Name.ToUpperInvariant()));
                id ??= added.Entity.Id;
            }

            var score = new Score(id!.Value, scoreDto.Total);
            await _context.Ranking.AddAsync(score);
            await _context.SaveChangesAsync();

            return Created(string.Empty, new {score.PlayerName, score.Total});
        }
        catch (Exception e)
        {
            _logger.LogCritical(e, e.Message);
            return Problem(statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}