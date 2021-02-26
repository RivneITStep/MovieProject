using WebApplicationRiderTest.EF.Entities;

namespace WebApplicationRiderTest.Interfaces
{
    public interface IJWTService
    {
        string CreateToken(User user);
    }
}