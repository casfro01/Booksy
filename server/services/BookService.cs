using System.ComponentModel.DataAnnotations;
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
        return db.Books
            .Include(b => b.Authors)
            .Select(b => new BaseBookResponse(b)).ToListAsync();
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
        var authors = new List<Author>();
        dto.AuthorsIDs.ForEach(id => authors.Add(db.Authors.First(a => a.Id == id)));
        
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
            Description = dto.Description,
            Genreid = dto.Genreid
        };
        
        // perform db actions
        db.Books.Add(book); 
        await db.SaveChangesAsync();
        return new BaseBookResponse(book);
    }

    public async Task<BaseBookResponse> Update(UpdateBookDto dto)
    {
        // Validate dto
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        // find book
        var currentBook = db.Books.First(b => b.Id == dto.Id);
        
        // update base information
        currentBook.Title = dto.Title;
        currentBook.Pages = dto.Pages;
        currentBook.Description = dto.Description;
        
        // update authors
        currentBook.Authors.Clear();
        dto.AuthorsIDs.ForEach(id => currentBook.Authors.Add(db.Authors.First(a => a.Id == id)));
        
        await db.SaveChangesAsync();
        return new BaseBookResponse(currentBook);
    }

    public async Task<BaseBookResponse> Delete(string id)
    {
        var book = db.Books.First(b => b.Id == id);
        db.Books.Remove(book);

        await db.SaveChangesAsync();

        return new BaseBookResponse(book);
    }
}