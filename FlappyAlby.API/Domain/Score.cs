namespace FlappyAlby.API.Domain;

public record Score(Guid PlayerId, int Total, Guid? Id = default) : EntityBase(Id)
{
    public Player? Player { get; }
    public string PlayerName => Player?.Name ?? string.Empty;
}