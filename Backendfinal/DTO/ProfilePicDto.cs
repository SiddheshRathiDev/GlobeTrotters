using System.Drawing.Printing;

namespace GlobeTrotters.HelperModels
{
    public class ProfilePicDto
    {
        public int uId { get; set; }
        public IFormFile Image { get; set; }
    }
}
