// ConnectionsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dacproject.Models;
using Dacproject.Data;

namespace GlobeTrotters.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionsController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public ConnectionsController(DacprojectContext context)
        {
            _context = context;
        }

        [HttpGet("followers")]
        public async Task<IActionResult> GetFollowers(int userId)
        {
            var followers = (from connection in _context.Connections
                             where connection.FollowingTo == userId
                             select connection.FollowedBy).ToList();

            return Ok(followers);
        }

        [HttpGet("followingTo")]
        public async Task<IActionResult> GetFollowing(int userId)
        {
            var followingTo = (from connection in _context.Connections
                             where connection.FollowedBy == userId
                             select connection.FollowingTo).ToList();

            return Ok(followingTo);
        }

        [HttpGet("GetData")]
        public int GetIfConnected([FromQuery] int userId, [FromQuery] int otherUserId)
        {
            var relationship = _context.Connections
        .FirstOrDefault(c =>
            (c.FollowedBy == userId && c.FollowingTo == otherUserId) ||
            (c.FollowedBy == otherUserId && c.FollowingTo == userId)
        );

            if (relationship != null)
            {
                if (relationship.FollowedBy == userId)
                    return -1;
                else if (relationship.FollowedBy == otherUserId)
                    return 1;
            }

            return 0;

        }




        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser(int userId, int otherId)
        {
            var connection = new Connection
            {
                FollowingTo = otherId,
                FollowedBy = userId
            };

            _context.Connections.Add(connection);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("unfollow")]
        public async Task<IActionResult> UnfollowUser(int followerId, int followingId)
        {
            var connection = await _context.Connections
                .SingleOrDefaultAsync(c => c.FollowingTo == followerId && c.FollowedBy == followingId);

            if (connection != null)
            {
                _context.Connections.Remove(connection);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpDelete("unFollow")]
        public async Task<IActionResult> Unfollow(int userId, int otherId)
        {
            var connection = await _context.Connections
                .SingleOrDefaultAsync(c => c.FollowingTo == otherId && c.FollowedBy == userId);

            if (connection != null)
            {
                _context.Connections.Remove(connection);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpDelete("removeFollower")]
        public async Task<IActionResult> RemoveFollower(int userId, int otherId)
        {
            var connection = await _context.Connections
                .SingleOrDefaultAsync(c => c.FollowingTo == userId && c.FollowedBy == otherId);

            if (connection != null)
            {
                _context.Connections.Remove(connection);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }


        //abhi
        [HttpGet("i_follow/{userId}")]
        public async Task<IActionResult> GetMyFollowers(int userId)
        {
            var followers = await _context.Connections
                .Where(c => c.FollowedBy == userId)
                .Select(c => c.FollowingToNavigation.UserId)
                .ToListAsync();

            return Ok(followers);
        }

        [HttpGet("my_followers/{userId}")]
        public async Task<IActionResult> GetMyFollowing(int userId)
        {
            var following = await _context.Connections
                .Where(c => c.FollowingTo == userId)
                .Select(c => c.FollowedByNavigation.UserId)
                .ToListAsync();

            return Ok(following);
        }

    }
}
