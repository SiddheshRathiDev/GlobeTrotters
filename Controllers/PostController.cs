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
using Microsoft.AspNetCore.Hosting;

namespace GlobeTrotters.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DacprojectContext _context;
        private static IWebHostEnvironment _webHostEnvironment;

        public PostsController(IWebHostEnvironment webHostEnvironment, DacprojectContext context)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _context.Posts
                .Select(post => new PostDTO
                {
                   
                    Caption = post.Caption,
                    Latitude = post.Latitude,
                    Longitude = post.Longitude,
                    LocationName = post.LocationName
                })
                .ToListAsync();

            return posts;
        }


        //get all posts
        [HttpGet("getAllPostsIds")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllPostsIds()
        {
            var postsIds = (from tempPost in _context.Posts
                         orderby tempPost.CreatedDatetime descending
                         select tempPost.PostId).ToList();

            return postsIds;

           
        }

        //get number of likes
        [HttpGet("{postId}")]
        public async Task<ActionResult<int>> GetLikeCount(int postId)
        {
            Post post = await (from tempPost in _context.Posts
                         where tempPost.PostId == postId
                         select tempPost).FirstAsync();
            Console.WriteLine("in server");
            Console.WriteLine(post.LikesCount);
            return post.LikesCount;
        }

        //get individual's postsIds
        [HttpGet("getIndividualPost/{userId}")]
        public async Task<ActionResult<IEnumerable<int>>> GetIndividualPosts(int userId)
        {
            var posts = (from  tempPost in _context.Posts
                         where tempPost.UserId == userId
                         orderby tempPost.CreatedDatetime descending
                         select tempPost.PostId).ToList();

            return posts;
        }

        //get username from postId
        //[HttpGet("getUserName/{postId}")]
        //public ActionResult GetUserName(int postId)
        //{
        //    var post = from tempPost in _context.Posts
        //               where tempPost.PostId == postId
        //               join user in _context.Users on tempPost.UserId equals user.UserId
        //               select new { tempPost.LocationName, tempPost.Caption, user.UserName, user.UserId };

        //    return Ok(post.ToList());
        //}

        //get username from postId
        [HttpGet("getUserName/{postId}")]
        public async Task<ActionResult> GetUserName(int postId)
        {
            var post = (from tempPost in _context.Posts
                       where tempPost.PostId == postId
                       join user in _context.Users on tempPost.UserId equals user.UserId
                       select new { tempPost.LocationName, tempPost.Caption, user.UserName, user.UserId }).ToList();

            return Ok(post);
        }





        [HttpGet("getCommentCount/{postId}")]
        public async Task<ActionResult<int>> GetCommentCount(int postId)
        {
            Post post = await (from tempPost in _context.Posts
                         where tempPost.PostId == postId
                         select tempPost).FirstAsync();
            Console.WriteLine("in server");
            Console.WriteLine(post.CommentsCount);
            return post.CommentsCount;
        }


        //get image
        [HttpGet("get_post_image/{postId}")]
        public async Task<IActionResult> GetPostPic(int postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
                return NotFound("post not found");
            else if (post.PostUrl != null)
            {
                var path = post.PostUrl;
                var postPic = System.IO.File.OpenRead(path);

                return File(postPic, "image/jpeg");
            }
            else
                return BadRequest("Profile pic not uploaded");
        }

        // POST: api/posts
        [HttpPost("upload_post")]
        public async Task<ActionResult<Post>> CreatePost([FromForm] PostDTO postDTO)
        {
            if (postDTO.ImageFile.Length > 0)
            {
                try
                {
                    string path;
                    var user = await _context.Users.FindAsync(postDTO.UserId);
                    if (user == null)
                        return NotFound("user not found");

                    var contentPath = _webHostEnvironment.ContentRootPath;
                    path = Path.Combine(contentPath, "Images");
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    var ext = Path.GetExtension(postDTO.ImageFile.FileName);
                    var allowedExtn = new string[] { ".jpg", ".png", ".jpeg" };
                    if (!allowedExtn.Contains(ext))
                    {
                        return BadRequest("Invalid file format only formats allowed are {0}" + string.Join(",", allowedExtn));
                    }

                    string uniqueStr = Guid.NewGuid().ToString();
                    string newFileName = uniqueStr + ext;
                    var fileWithPath = Path.Combine(path, newFileName);

                    var stream = new FileStream(fileWithPath, FileMode.Create);
                    postDTO.ImageFile.CopyTo(stream);
                    stream.Flush();
                    stream.Close();

                    var post = new Post();
                    post.UserId = postDTO.UserId;
                    post.PostUrl = fileWithPath;
                    post.Caption = postDTO.Caption;
                    post.Latitude = postDTO.Latitude;
                    post.Longitude = postDTO.Longitude;
                    post.LocationName = postDTO.LocationName;
                    post.CreatedDatetime = DateTime.UtcNow;
                    post.LikesCount = 0;
                    post.CommentsCount = 0;

                    _context.Posts.Add(post);
                    await _context.SaveChangesAsync();
                    return Ok("post uploaded successfully");

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message.ToString());
                }
            }
            else
                return BadRequest("please upload image file");
        }

    }
}
