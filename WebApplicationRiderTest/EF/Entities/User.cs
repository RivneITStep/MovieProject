using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WebApplicationRiderTest.EF.Entities
{
    public class User : IdentityUser
    {
        public double Balance { get; set; }
        public string PictureUrl { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Movie> Movies { get; set; }
    }
}