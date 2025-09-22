using System.ComponentModel.DataAnnotations;
using api.Controllers;
using dataaccess;
using Microsoft.EntityFrameworkCore;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace services;

public class BookService(MyDbContext db) : IService<BaseBookResponse, CreateBookDto, UpdateBookDto>
{
    public Task<List<BaseBookResponse>> Get()
    {
        return db.Books.Select(b => new BaseBookResponse(b)).ToListAsync();
    }

    [Obsolete("Find in get books instead or cached books in client application, ig")]
    public async Task<BaseBookResponse> Get(string id)
    {
        var book = await db.Books.FirstOrDefaultAsync(b => b.Id == id);
        return book == null ? throw new KeyNotFoundException("Book not found") : new BaseBookResponse(book);
    }

    public async Task<BaseBookResponse> Create(CreateBookDto dto)
    {
        // validate the dto
        // books can have the same title tho,
        // because apparently it's not protected by copyright according to some sources
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        // generate data
        var authors = new List<Author>(); // TODO : find authors
        var id = Guid.NewGuid().ToString();
        var time = DateTime.UtcNow;
        
        // create book
        var book = new Book
        {
            Id = id,
            Authors = authors,
            Title = dto.Title,
            Pages = dto.Pages,
            Createdat = time,
            Genreid = dto.Genreid
        };
        
        // perform db actions
        db.Books.Add(book); 
        await db.SaveChangesAsync();
        return new BaseBookResponse(book);
    }

    public Task<BaseBookResponse> Update(UpdateBookDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<BaseBookResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }
}