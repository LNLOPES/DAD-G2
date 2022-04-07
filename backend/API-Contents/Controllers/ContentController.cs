using API_Contents.Entities;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Firebase.Auth;
using Firebase.Storage;

namespace API_Contents.Controllers
{
    // ROLES [ADM, TEACHER, STUDENT]
    [ApiController]
    [Route("[controller]")]
    public class ContentController : ControllerBase
    {
        static private List<Content> contents = new List<Content> {
            new Content { Title = "Material didático Ex:1", Description = "", DisciplineId = 1, Id = 1 },
            new Content { Title = "Matéria Prova", Description = "Ajuda para estudar a prova", DisciplineId = 1, Id = 2 },
            new Content { Title = "Some test content", Description = "content description", DisciplineId = 1, Id = 3 }
        };

        [HttpGet(Name = "GetContents")]
        public IActionResult getContents()
        {
            return Ok(contents.ToArray());
        }

        [HttpPost(Name = "PostContent")]
        public IActionResult postContent(Content newContent)
        {
            newContent.Id = contents.Last().Id + 1;
            contents.Add(newContent);
            return Ok(newContent);
        }

        [HttpPost("/some-route")]
        public async Task<IActionResult> getFile(IFormFile file)
        {
            string filePath = Path.GetTempFileName();

            // Get any Stream - it can be FileStream, MemoryStream or any other type of Stream


            var stream = File.Open(filePath, FileMode.Open);

            //authentication
            var auth = new FirebaseAuthProvider(new FirebaseConfig("AAAAOmQEkJA:APA91bH8pFlSbDr5Yvc-TjA7Bnc3lCIPszcU4xathQe62MUBNtIxPL3alxe4e7rFB7OCXBJc1F_TX9i8lbtrJ2G4JNKs7jWdTTfO9VYijmC1gSvvaFh4hR-FbFL_55AC6g-GktFlyfgJ"));

            // Constructr FirebaseStorage, path to where you want to upload the file and Put it there
            var task = new FirebaseStorage(
                "your-bucket.appspot.com"
            
                 new FirebaseStorageOptions
                 {
                     AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                     ThrowOnCancel = true,
                 })
                .Child("data")
                .Child("random")
                .Child("file.png")
                .PutAsync(stream);

            // Track progress of the upload
            task.Progress.ProgressChanged += (s, e) => Console.WriteLine($"Progress: {e.Percentage} %");

            // await the task to wait until upload completes and get the download url
            var downloadUrl = await task;

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            Console.WriteLine(Request.ContentType);
            return Ok(filePath);
        }
    }
}
