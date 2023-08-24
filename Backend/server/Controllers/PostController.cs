using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dacproject.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dacproject.Data;
using TodoApi.Models.DTOs;

namespace GlobeTrotters.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DacprojectContext _context;

        public PostsController(DacprojectContext context)
        {
            _context = context;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _context.Posts
                .Select(post => new PostDTO
                {
                    PostUrl = post.PostUrl,
                    Caption = post.Caption,
                    Latitude = post.Latitude,
                    Longitude = post.Longitude,
                    LocationName = post.LocationName
                })
                .ToListAsync();

            return posts;
        }

        //get number of likes
        [HttpGet("{postId}")]
        public async Task<ActionResult<int>> GetLikeCount(int postId)
        {
            Post post = (from tempPost in _context.Posts
                         where tempPost.PostId == postId
                         select tempPost).First();
            Console.WriteLine("in server");
            Console.WriteLine(post.LikesCount);
            return post.LikesCount;
        }

        //get individual's posts
        [HttpGet("getIndividualPost/{userId}")]
        public async Task<ActionResult<IEnumerable<int>>> GetIndividualPosts(int userId)
        {
            var posts = (from  tempPost in _context.Posts
                         where tempPost.UserId == userId
                         select tempPost.PostId).ToList();

            return posts;
        }

        //get username from postId
        [HttpGet("getUserName/{postId}")]
        public ActionResult GetUserName(int postId)
        {
            var post = from tempPost in _context.Posts
                       where tempPost.PostId == postId
                       join user in _context.Users on tempPost.UserId equals user.UserId
                       select new { tempPost.LocationName, user.UserName };

            return Ok(post.ToList());
        }





        [HttpGet("/getCommentCount{postId}")]
        public async Task<ActionResult<int>> GetCommentCount(int postId)
        {
            Post post = (from tempPost in _context.Posts
                         where tempPost.PostId == postId
                         select tempPost).First();
            Console.WriteLine("in server");
            Console.WriteLine(post.CommentsCount);
            return post.CommentsCount;
        }

        // POST: api/posts
        [HttpPost]
        public async Task<ActionResult<PostDTO>> CreatePost([FromForm] PostDTO postDTO)
        {

            //int currentUserId = await _context.Users
            //                    .Select(user => new User
            //                    {
            //                        currentUserId = user.UserId,
            //                    })/* Get the current user's ID from your authentication */;

            // Process and store the image file
            int? currentUserId = null;
            string imageFileName = null;
            if (postDTO.ImageFile != null)
            {
                // Generate a unique image filename (you can use a GUID, timestamp, etc.)
                imageFileName = $"{Guid.NewGuid().ToString()}_{DateTime.UtcNow.Ticks.ToString()}.jpg";
                
                // Construct the path to store the image
                string imagePath = Path.Combine("Images", imageFileName);

                // Save the image to the server's file system
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await postDTO.ImageFile.CopyToAsync(stream);
                }
            }

            var post = new Post
            {
                UserId = postDTO.UserId,
                PostUrl = imageFileName,
                Caption = postDTO.Caption,
                Latitude = postDTO.Latitude,
                Longitude = postDTO.Longitude,
                LocationName = postDTO.LocationName,
                CreatedDatetime = DateTime.UtcNow,
                LikesCount = 0,
                CommentsCount = 0
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

           
            return Ok(post);
        }

    }
}
