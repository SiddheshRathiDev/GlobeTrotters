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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostLike>>> GetPostLikes()
        {
          if (_context.PostLikes == null)
          {
              return NotFound();
          }
            return await _context.PostLikes.ToListAsync();
        }

        // GET: api/PostLikes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostLike>> GetPostLike(int id)
        {
          if (_context.PostLikes == null)
          {
              return NotFound();
          }
            var postLike = await _context.PostLikes.FindAsync(id);

            if (postLike == null)
            {
                return NotFound();
            }

            return postLike;
        }

        // PUT: api/PostLikes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostLike(int id, PostLike postLike)
        {
            if (id != postLike.LikeId)
            {
                return BadRequest();
            }

            _context.Entry(postLike).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostLikeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PostLikes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostLikeDTO>> PostPostLike(PostLikeDTO postLikeDTO)
        {
          if (_context.PostLikes == null)
          {
              return Problem("Entity set 'DacprojectContext.PostLikes'  is null.");
          }
            _context.PostLikes.Add(new PostLike(postLikeDTO));
            await _context.SaveChangesAsync();

            return postLikeDTO;
        }

        // DELETE: api/PostLikes/5
        [HttpDelete("{userId}")]
        public async Task<ActionResult<string>> DeletePostLike([FromBody] int postId, int userId)
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
            await _context.SaveChangesAsync();

            return "deleted successfully";
        }

        private bool PostLikeExists(int id)
        {
            return (_context.PostLikes?.Any(e => e.LikeId == id)).GetValueOrDefault();
        }
    }
}
