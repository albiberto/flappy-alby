namespace FlappyAlby.API.Domain;

public record Player(string Name, Guid? Id = default) : EntityBase(Id)
{
    public IEnumerable<Score> Rankings { get; } = new HashSet<Score>();
}