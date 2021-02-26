using System.ComponentModel.DataAnnotations;

namespace WebApplicationRiderTest.DTO.User
{
    public class UserLoginDTO
    {
        [Required(ErrorMessage = "Please, enter email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please, enter password")]
        public string Password { get; set; }
    }
}