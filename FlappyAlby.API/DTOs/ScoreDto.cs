namespace FlappyAlby.API.DTOs;

using System.ComponentModel.DataAnnotations;

public record ScoreDto([Required] [MinLength(3)] [MaxLength(20)] string Name, [Required] [Range(1000, int.MaxValue)] int Total)
{
    public string PlayerName => Name.ToUpperInvariant();
}