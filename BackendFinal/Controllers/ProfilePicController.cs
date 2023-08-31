using Dacproject.Data;
using GlobeTrotters.HelperModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.IO;

namespace GlobeTrotters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilePicController : ControllerBase
    {
        private readonly DacprojectContext _context;
        private static IWebHostEnvironment _webHostEnvironment;

        public ProfilePicController(IWebHostEnvironment webHostEnvironment, DacprojectContext context)
        {
            this._context = context;
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpGet("{uId}")]
        public async Task<IActionResult> GetProfilePic(int uId)
        {
            var user = await _context.Users.FindAsync(uId);
            if (user == null)
                return NotFound("user not found");
            else if (user.ProfilePhoto != null)
            {
                var path = user.ProfilePhoto;
                var profPic = System.IO.File.OpenRead(path);

                return File(profPic, "image/jpeg");
            }
            else
                return BadRequest("Profile pic not uploaded");
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadProfilePic([FromForm] ProfilePicDto obj)
        {
            if (obj.Image.Length > 0)
            {
                try
                {
                    string path;
                    var user = await _context.Users.FindAsync(obj.uId);
                    if (user == null)
                        return NotFound("user not found");
                    else if (user.ProfilePhoto != null)
                    {
                        path = user.ProfilePhoto;
                        System.IO.File.Delete(path);
                    }

                    var contentPath = _webHostEnvironment.ContentRootPath;
                    path = Path.Combine(contentPath, "ProfilePicData");
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    var ext = Path.GetExtension(obj.Image.FileName);
                    var allowedExtn = new string[] { ".jpg", ".png", ".jpeg" };
                    if (!allowedExtn.Contains(ext))
                    {
                        return BadRequest("Invalid file format only formats allowed are {0}" + string.Join(",", allowedExtn));
                    }

                    string uniqueStr = Guid.NewGuid().ToString();
                    string newFileName = uniqueStr + ext;
                    var fileWithPath = Path.Combine(path, newFileName);

                    var stream = new FileStream(fileWithPath, FileMode.Create);
                    obj.Image.CopyTo(stream);
                    stream.Flush();
                    stream.Close();

                    user.ProfilePhoto = fileWithPath;
                    _context.SaveChanges();
                    return Ok("profile pic uploaed successfully");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message.ToString());
                }
            }
            else
                return BadRequest("please provide image to upload");
        }


        [HttpDelete("{uId}")]
        public async Task<IActionResult> DeleteProfilePic(int uId)
        {
            var user = await _context.Users.FindAsync(uId);
            if (user == null)
                return NotFound("user not found");
            else if (user.ProfilePhoto != null)
            {
                var path = user.ProfilePhoto;
                System.IO.File.Delete(path);
                user.ProfilePhoto = null;
                await _context.SaveChangesAsync();
                return Ok("profile pic deleted successfully");
            }
            else
                return BadRequest("no profile pic found");
        }
    }
}


