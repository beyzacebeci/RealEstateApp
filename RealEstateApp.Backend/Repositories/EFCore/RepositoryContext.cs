using Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Repositories.EFCore.Config;

namespace Repositories.EFCore
{
    public class RepositoryContext : IdentityDbContext<User>
    {
        public RepositoryContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Estate> Estates { get; set; }
        public DbSet<EstateType> EstateTypes { get; set; }
        public virtual DbSet<EstateStatus> EstateStatuses { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<Currency> Currencies { get; set; }
        public virtual DbSet<Photo> Photos { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           //ilgili tablolarin olusmasini saglar
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserRoleConfiguration());


            // Bire çok ilişkiyi yapılandırın
            modelBuilder.Entity<Estate>()
                .HasMany(e => e.Photos)
                .WithOne(p => p.Estate)
                .HasForeignKey(p => p.EstateId);

            //modelBuilder.Entity<Price>()
            //    .HasOne(p => p.Estate)
            //    .WithMany(e => e.Prices)
            //    .HasForeignKey(p => p.EstateId)
            //    .OnDelete(DeleteBehavior.Restrict);





        }
    }
}
