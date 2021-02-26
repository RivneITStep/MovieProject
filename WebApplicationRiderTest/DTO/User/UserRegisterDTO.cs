using System.ComponentModel.DataAnnotations;

namespace WebApplicationRiderTest.DTO.User
{
    public class UserRegisterDTO
    {
        [Required(ErrorMessage = "Enter email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Enter password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}