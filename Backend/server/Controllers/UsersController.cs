using Dacproject.Data;
using Dacproject.Models;
using GlobeTrotters.DtoModels;
using GlobeTrotters.HelperModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GlobeTrotters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class UsersController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public UsersController(DacprojectContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }



        [HttpPost]
        public async Task<ActionResult<User>> InsertNewUser([FromBody] RegisterUserDto tempUser)
        {
            User user = new User();
            user.Email = tempUser.Email;
            user.Password = tempUser.Password;
            user.UserName = tempUser.UserName;
            user.Name = tempUser.Name;
            user.Dob = tempUser.DateOfBirth;
            user.Gender = tempUser.Gender;
            user.Mobile = tempUser.Mobile;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }


        [HttpPut]
        public async Task<ActionResult<User>> UpdateExistingUser( UpdateUserDto tempUser)
        {
            if (_context.Users == null)
                NotFound();

            else
            {
                User user = await _context.Users.FindAsync(tempUser.UId);

                if (user == null)
                    NotFound();

                else
                {
                   
                    user.Name = tempUser.Name;
                    user.Dob = tempUser.Dob;
                    user.Gender = tempUser.Gender;
                    user.Mobile = tempUser.Mobile;

                    await _context.SaveChangesAsync();

                    return user;
                }
            }
            return NotFound();
        }
    

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }

}

