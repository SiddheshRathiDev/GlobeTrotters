using Dacproject.Data;
using Dacproject.Models;
using GlobeTrotters.DtoModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GlobeTrotters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogInUserController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public LogInUserController(DacprojectContext context)
        {
            this._context = context;
        }
        [HttpPost]
        public async Task<ActionResult<User>> AutheticateUser(LogInUserDto ipUser)
        {
            if (_context.Users == null)
                return NotFound();
            else
            {
                User user = (from u in _context.Users
                                 where u.Email.Equals(ipUser.EmailId) &&  u.Password.Equals(ipUser.Password)
                                 select u).FirstOrDefault();

                if (user == null)
                    return NotFound();
                else
                    return user;
            }
        }
    }

}

