using Dacproject.Data;
using Dacproject.Models;
using GlobeTrotters.DtoModels;
using GlobeTrotters.HelperModels;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace GlobeTrotters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncryptedUserController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public EncryptedUserController(DacprojectContext context)
        {
            _context = context;
        }

        public static string encryptPassword(string password)
        {
            byte[] key = System.Text.Encoding.UTF8.GetBytes("sekret");
            HMACSHA512 hmac = new HMACSHA512(key);
            byte[] encyptedPasswdHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            //returns string format of encyptedPasswdHash
            return Convert.ToBase64String(encyptedPasswdHash);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] RegisterUserDto tempUser)
        {
            User user = new User();
            user.Email = tempUser.Email;
            user.Password = encryptPassword(tempUser.Password);
            user.UserName = tempUser.UserName;
            user.Dob = tempUser.DateOfBirth;
            user.Gender = tempUser.Gender;
            user.Mobile = tempUser.Mobile;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }


        [HttpPost("login")]
        public async Task<ActionResult<User>> AutheticateUser(LogInUserDto ipUser)
        {
            if (_context.Users == null)
                return NotFound("user not registered");
            else
            {
                User user = (from u in _context.Users
                             where u.Email.Equals(ipUser.EmailId)
                             select u).FirstOrDefault();

                if (user == null)
                    return BadRequest("wrong email id");
                else
                {
                    if (encryptPassword(ipUser.Password).Equals(user.Password))
                        return user;
                    else
                        return BadRequest("wrong password");
                }
            }
        }
    }
}

