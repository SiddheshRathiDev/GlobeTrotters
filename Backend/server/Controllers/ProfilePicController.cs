using Dacproject.Data;
using GlobeTrotters.HelperModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        [Route("upload")]
        public async Task<string> UploadProfilePic([FromForm] UploadProfilePicDto obj)
        {
            string path;
            if (obj.Image.Length > 0)
            {
                try
                {
                    if (!Directory.Exists(_webHostEnvironment.ContentRootPath + "\\ProfilePicData\\"))
                        Directory.CreateDirectory(_webHostEnvironment.ContentRootPath + "\\ProfilePicData\\");

                    var user = await _context.Users.FindAsync(obj.uId);
                    if (user == null)
                        return "user not found";
                    else if (user.ProfilePhoto != null)
                    {
                        path = user.ProfilePhoto;
                        System.IO.File.Delete(path);
                    }

                    path = _webHostEnvironment.ContentRootPath + "\\ProfilePicData\\" + obj.Image.FileName + Guid.NewGuid().ToString();
                    using (FileStream fileStream = System.IO.File.Create(path))
                    {
                        obj.Image.CopyTo(fileStream);
                        fileStream.Flush();

                        user.ProfilePhoto = path;
                        _context.SaveChanges();
                        return "profile pic uploaed successfully";
                    }
                }
                catch (Exception ex)
                {
                    return ex.Message.ToString();
                }
            }
            else
                return "upload failed";
        }
    }
}

