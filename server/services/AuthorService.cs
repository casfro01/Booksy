using System.ComponentModel.DataAnnotations;
using dataaccess;
using Microsoft.EntityFrameworkCore;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace services;

public class AuthorService(MyDbContext db) : IService<BaseAuthorResponse, CreateAuthorDto, UpdateAuthorDto>
{
    public Task<List<BaseAuthorResponse>> Get()
    {
        return db.Authors.Select(a => new BaseAuthorResponse(a)).ToListAsync();
    }

    [Obsolete("Find in get authors instead or cached authors in client application, ig")]
    public async Task<BaseAuthorResponse> Get(string id)
    {
        var author = await db.Authors.FirstOrDefaultAsync(a => a.Id == id);
        return author == null ? throw new KeyNotFoundException("Author not found") : new BaseAuthorResponse(author);
    }

    public async Task<BaseAuthorResponse> Create(CreateAuthorDto dto)
    {
        // validate the dto
        // books can have the same title tho,
        // because apparently it's not protected by copyright according to some sources
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        // generate data
        var id = Guid.NewGuid().ToString();
        var name = dto.Name;        
        var time = DateTime.UtcNow;
        var books = new List<Book>(); // TODO : find books

        // create book
        var author = new Author()
        {
            Id = id,
            Name = name,
            Createdat = time,
            Books = books
        };
        
        // perform db actions
        db.Authors.Add(author); 
        await db.SaveChangesAsync();
        return new BaseAuthorResponse(author);
    }

    public Task<BaseAuthorResponse> Update(UpdateAuthorDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<BaseAuthorResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }
}