using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.EFCore.Config
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Şifreler hashlenmiş olarak eklenmelidir
            var hasher = new PasswordHasher<User>();

            builder.HasData(
                new User
                {
                    Id = "1", 
                    FirstName ="Admin",
                    LastName="Admin",
                    UserName = "admin",
                    NormalizedUserName ="ADMIN",
                    PasswordHash = hasher.HashPassword(null, "Admin2024.") // Şifreyi hashle
                },
                new User
                {
                    Id = "2",  
                    FirstName ="User",
                    LastName="User",
                    UserName = "user",
                    NormalizedUserName ="USER",
                    PasswordHash = hasher.HashPassword(null, "User2024.") // Şifreyi hashle
                }
            );
        }
    }
}
