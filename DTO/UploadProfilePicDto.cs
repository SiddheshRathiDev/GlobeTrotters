using System.Drawing.Printing;

namespace GlobeTrotters.HelperModels
{
    public class UploadProfilePicDto
    {
        public int uId { get; set; }
        public IFormFile Image { get; set; }
    }
}
