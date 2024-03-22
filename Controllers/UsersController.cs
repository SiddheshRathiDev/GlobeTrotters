using Dacproject.Data;
using Dacproject.Models;
using GlobeTrotters.DtoModels;
using GlobeTrotters.HelperModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

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

        [HttpGet("/getUserName{userId}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserName(int userId)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            var userName = (from user in _context.Users
                              where user.UserId == userId
                              select user.UserName).First().ToString();
            return Ok(userName);
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

        //get username and userId
        [HttpGet("/getUserNameAndId/{userToFind}")]
        public async Task<ActionResult<User>> GetUserNameAndId(string userToFind)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = (from user in _context.Users
                        where user.UserName == userToFind || user.Name == userToFind
                        select new {user.UserName, user.UserId}).ToList();

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        //for suggestions for you component get username and userId of max liked post's user
        //[HttpGet("getUserWithMaxLikedPost/{currentUserId}")]
        //public ActionResult GetUserWithMaxLikedPost(int currentUserId)
        //{
        //    if (_context.Users == null)
        //    {
        //        return NotFound();
        //    }
        //    var users = (from post in _context.Posts
        //                 join user in _context.Users on post.UserId equals user.UserId
        //                 where user.UserId != currentUserId  
        //                 orderby post.LikesCount descending
        //                 select new { user.UserId, user.UserName })
        //                        .Distinct().Take(2).ToList();

        //    if (users == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(users);
        //}


        [HttpGet("getUserWithMaxLikedPost/{currentUserId}")]
        public ActionResult GetUserWithMaxLikedPost(int currentUserId)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = (from post in _context.Posts
                         join user in _context.Users on post.UserId equals user.UserId
                         where user.UserId != currentUserId &&
                               (!(from connection in _context.Connections
                                  where (connection.FollowedBy == post.UserId && connection.FollowingTo == currentUserId) ||
                                        (connection.FollowedBy == currentUserId && connection.FollowingTo == post.UserId)
                                  select connection).Any())
                         orderby post.LikesCount descending
                         select new { user.UserId, user.UserName })
                     .Distinct().Take(2).ToList();


            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
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
            user.ProfilePhoto = "F:\\CDAC\\Final Project\\globeServer\\ProfilePicData\\e8f97d39-415e-4ccc-8bda-ff51fedd2764.png";

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

