﻿using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApplicationRiderTest.EF;
using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.Helper
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
            IWebHostEnvironment env,
            IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole);
            }
        }
        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;
            }


            string email = "admin@gmail.com";
            var admin = new User
            {
                Email = email,
                UserName = email
            };
            var user = new User
            {
                Email = "cuanid236316@gmail.com",
                UserName = "cuanid236316@gmail.com"
            };

            var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
            resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;

            var resultUser = userManager.CreateAsync(user, "Qwerty1-").Result;
            resultUser = userManager.AddToRoleAsync(user, "User").Result;

        }
    }
}