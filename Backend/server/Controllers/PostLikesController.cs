using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dacproject.Data;
using Dacproject.Models;
using WebApplicationMySql.DTO;

namespace WebApplicationMySql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostLikesController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public PostLikesController(DacprojectContext context)
        {
            _context = context;
        }

        // GET: api/PostLikes
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<PostLike>>> GetPostLikes()
        {
          if (_context.PostLikes == null)
          {
              return NotFound();
          }
            return await _context.PostLikes.ToListAsync();
        }

        // GET: api/PostLikes/5
        [HttpGet("{postId}")]
        public async Task<ActionResult<int>> GetNumbeOfLikesPerPost(int postId)
        {
          if (_context.PostLikes == null)
          {
              return NotFound();
          }
            var postLike =  (from post in _context.PostLikes
                            where post.PostId == postId
                            select post).Count();

            if (postLike == 0)
            {
                return NotFound();
            }

            return postLike;
        }


        [HttpGet("GetData")]
        public async Task<ActionResult<int>> WhoLiked([FromQuery] int userId, [FromQuery] int postId)
        {
            if (_context.PostLikes == null)
            {
                return NotFound();
            }
            try
            {
                dynamic postLike = (from post in _context.PostLikes
                                    where post.PostId == postId && post.UserId == userId
                                    select post).First();
                return 1;

            }
            catch (Exception ex)
            {
                return 0;
            }
            
            

        }



       
        

        // POST: api/PostLikes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("insertLike")]
        public async Task<ActionResult<string>> PostPostLike([FromQuery] int userId, [FromQuery] int postId)
        {
          if (_context.PostLikes == null)
          {
              return Problem("Entity set 'DacprojectContext.PostLikes'  is null.");
          }
            PostLike postLike = new PostLike();
            postLike.UserId = userId;
            postLike.PostId = postId;
            postLike.CreatedDatetime = DateTime.UtcNow;
            _context.PostLikes.Add(postLike);
            await _context.SaveChangesAsync();

            Post post = (from tempPost in _context.Posts
                         where tempPost.PostId == postId
                         select tempPost).First();
            var likes = ++post.LikesCount;
            _context.SaveChangesAsync();



            return "inserted successfully";
        }

        // DELETE: api/PostLikes/5
        [HttpDelete("deleteLike")]
        public async Task<ActionResult<string>> DeletePostLike([FromQuery] int userId, [FromQuery] int postId)
        {
            if (_context.PostLikes == null)
            {
                return NotFound();
            }
            var postLike = (from like in _context.PostLikes
                            where like.PostId == postId && like.UserId == userId
                            select like).First();
            if (postLike == null)
            {
                return NotFound();
            }

            _context.PostLikes.Remove(postLike);
            Post post = (from tempPost in _context.Posts
                         where tempPost.PostId == postId
                         select tempPost).First();
            var likes = --post.LikesCount;
           
            await _context.SaveChangesAsync();


            return "deleted successfully";
        }

        private bool PostLikeExists(int id)
        {
            return (_context.PostLikes?.Any(e => e.LikeId == id)).GetValueOrDefault();
        }
    }
}
