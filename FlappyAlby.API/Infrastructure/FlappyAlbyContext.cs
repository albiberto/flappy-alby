namespace FlappyAlby.API.Infrastructure;

using Domain;
using Microsoft.EntityFrameworkCore;

public class FlappyAlbyContext : DbContext
{
    public FlappyAlbyContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Player> Players { get; set; } = null!;
    public DbSet<Score> Ranking { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var ranking = modelBuilder.Entity<Score>();
        ranking.HasKey(r => r.Id);
        // ranking.Property(r => r.Id).ValueGeneratedOnAdd();
        ranking.Property(r => r.Total).IsRequired();

        var player = modelBuilder.Entity<Player>();
        player.HasKey(p => p.Id);
        // ranking.Property(r => r.Id).ValueGeneratedOnAdd();
        player.Property(p => p.Name).HasMaxLength(20).IsRequired();
        player.HasIndex(p => p.Name).IsUnique();

        player
            .HasMany(p => p.Rankings)
            .WithOne(s => s.Player)
            .HasForeignKey(r => r.PlayerId);
    }
}