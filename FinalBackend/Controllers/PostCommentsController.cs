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
using GlobeTrotters.DTO;

namespace WebApplicationMySql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostCommentsController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public PostCommentsController(DacprojectContext context)
        {
            _context = context;
        }

        // GET: api/PostComments
        [HttpGet("{postId}")]
        public ActionResult GetPostCommentsById(int postId)
        {
            if (_context.PostComments == null)
            {
                return NotFound();
            }
            
            var comments = from comment in _context.PostComments
                           where comment.PostId == postId
                           join user in _context.Users on comment.UserId equals user.UserId
                           orderby comment.CreatedDatetime descending
                           select new { comment.CommentContent, user.UserName, user.UserId};

            // Return the results as a list.
            return Ok(comments.ToList());

        }

        // GET: api/PostComments/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<PostComment>> GetPostComment(int id)
        //{
        //  if (_context.PostComments == null)
        //  {
        //      return NotFound();
        //  }
        //    var postComment = await _context.PostComments.FindAsync(id);

        //    if (postComment == null)
        //    {
        //        return NotFound();
        //    }

        //    return postComment;
        //}

        // PUT: api/PostComments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostComment(int id, PostComment postComment)
        {
            if (id != postComment.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(postComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostCommentExists(id))
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



        // POST: api/PostComments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostCommentDTO>> PostPostComment(PostCommentDTO postCommentDTO)
        {
          if (_context.PostComments == null)
          {
              return Problem("Entity set 'DacprojectContext.PostComments'  is null.");
          }

            PostComment postComment = new PostComment();
            postComment.PostId = postCommentDTO.PostId;
            postComment.UserId = postCommentDTO.UserId;
            postComment.CommentContent = postCommentDTO.CommentContent;
            postComment.CreatedDatetime = DateTime.Now;

            
            _context.PostComments.Add(postComment);

            Post post = (from tempPost in _context.Posts
                         where tempPost.PostId == postCommentDTO.PostId
                         select tempPost).First();
            var commentCount = ++post.CommentsCount;


            await _context.SaveChangesAsync();

            return postCommentDTO;
        }

        // DELETE: api/PostComments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostComment(int id)
        {
            if (_context.PostComments == null)
            {
                return NotFound();
            }
            var postComment = await _context.PostComments.FindAsync(id);
            if (postComment == null)
            {
                return NotFound();
            }

            _context.PostComments.Remove(postComment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostCommentExists(int id)
        {
            return (_context.PostComments?.Any(e => e.CommentId == id)).GetValueOrDefault();
        }
    }
}
