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
            var followers = await _context.Connections
                .Where(c => c.FollowedBy == userId)
                .Select(c => c.FollowingToNavigation)
                .ToListAsync();

            return Ok(followers);
        }

        [HttpGet("following")]
        public async Task<IActionResult> GetFollowing(int userId)
        {
            var following = await _context.Connections
                .Where(c => c.FollowingTo == userId)
                .Select(c => c.FollowedByNavigation)
                .ToListAsync();

            return Ok(following);
        }


        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser(int followerId, int followingId)
        {
            var connection = new Connection
            {
                FollowingTo = followerId,
                FollowedBy = followingId
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

    }
}
