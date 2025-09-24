using dataaccess;
using Microsoft.EntityFrameworkCore;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests;

public class AuthorTestWithBooks(MyDbContext ctx, IService<BaseAuthorResponse, CreateAuthorDto, UpdateAuthorDto> service)
{
    [Fact]
    public async Task CreateAuthorWithBooks_NoErrors()
    {
        var book = CreateBookWithAnAuthor(null, "Jens' book", 11);
        ctx.Books.Add(book);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        var author = NewAuthor("Jens", book.Id);
        await service.Create(author);

        // assure that there is only one book and one author
        Assert.Equal(1, ctx.Authors.Count());
        Assert.Equal(1, ctx.Books.Count());
        
        var currentBook = ctx.Books.First();
        var currentAuthor = ctx.Authors.
            Include(a => a.Books)
            .ThenInclude(b => b.Genre).First();
        
        Assert.Equal(currentAuthor.Books.First().Id, currentBook.Id);

    }
    
    [Fact]
    public async Task UpdateAuthorWithBooks_NoErrors()
    {
        var initialAuthor = CreateAuthorWithBook("Jens", "Jens' book", 11);
        var newBook = CreateBookWithAnAuthor(null, "The New Book", 11);
        ctx.Books.Add(initialAuthor.Books.First());
        ctx.Books.Add(newBook);
        ctx.Authors.Add(initialAuthor);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        // test the test ;)
        Assert.Equal(1, ctx.Authors.Count());
        Assert.Equal(2, ctx.Books.Count());
        Assert.Equal(initialAuthor.Books.First().Id, ctx.Books.First(b => b.Authors.First().Id == initialAuthor.Id).Id);

        var updateADto = new UpdateAuthorDto
        {
            Id = initialAuthor.Id,
            Name = initialAuthor.Name,
            BooksIDs = [newBook.Id]
        };
        
        await service.Update(updateADto);
        
        var currentAuthor = ctx.Authors.Include(author => author.Books).First();
        var newBookFromDb = ctx.Books.Include(book => book.Authors).First(b  => b.Id == newBook.Id);
        Assert.Equal(currentAuthor.Books.First().Id, newBook.Id);
        Assert.Equal(newBookFromDb.Authors.First().Name, initialAuthor.Name);
    }
    
    [Fact]
    public async Task FetchAuthorWithBooks_NoErrors()
    {
        // arrange
        var author1 = CreateAuthorWithBook("Jens 1", "En bog", 11);
        var coAuthor = CreateAuthorWithBook("Co", "His own", 12);
        var author2 = CreateAuthorWithBook("Jens 2", "Jens' book", 11);
        ctx.Authors.Add(author1);
        ctx.Authors.Add(author2);
        ctx.Authors.Add(coAuthor);
        ctx.Books.Add(author1.Books.First());
        ctx.Books.Add(author2.Books.First());
        ctx.Books.Add(coAuthor.Books.First());
        coAuthor.Books.Add(author1.Books.First());
        
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        Assert.Equal(3, ctx.Authors.Count());
        Assert.Equal(3, ctx.Books.Count());
        Assert.Equal(2, ctx.Authors.
            Include(a => a.Books).
            First(a => a.Id == coAuthor.Id).Books.Count);
        
        // act
        var aList = await service.Get();
        Assert.Equal(3, aList.Count);
        Assert.Equal(2, aList.First(a => a.Id == coAuthor.Id).BooksIDs.Count);
        Assert.Single(aList.First(a => a.Id == author1.Id).BooksIDs);
        Assert.Single(aList.First(a => a.Id == author2.Id).BooksIDs);
    }

    private Book CreateBookWithAnAuthor(Author? author, string title, int pages)
    {
        var book = new Book
        {
            Id = Guid.NewGuid().ToString(),
            Title = title,
            Pages = pages,
            Createdat = DateTime.UtcNow,
            Authors = author == null ? new List<Author>() :  new List<Author> { author }
        };
        
        return book;
    }

    private Author CreateAuthorWithBook(string name, string title, int pages)
    {
        var author = new Author
        {
            Name =  name,
            Id = Guid.NewGuid().ToString(),
            Createdat = DateTime.UtcNow
        };
        var book = CreateBookWithAnAuthor(author, title, pages);
        author.Books.Add(book);
        return author;
    }

    private CreateAuthorDto NewAuthor(string name, string? bookID)
    {
        return new CreateAuthorDto
        {
            Name = name,
            BooksIDs = bookID == null ? [] : [bookID]
        };
    }
}