using dataaccess;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests.BookTests;

public class UpdateBook(MyDbContext ctx, IService<BaseBookResponse, CreateBookDto, UpdateBookDto> service)
{
    [Fact]
    public async Task UpdateBook_Success()
    {
        var id = Guid.NewGuid().ToString();
        var book = new Book
        {
            Id = id,
            Title = "Test",
            Pages = 11,
            Authors = new List<Author>(),
            Createdat = DateTime.UtcNow,
        };
        ctx.Books.Add(book);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Books.Count());

        var updatedBook = new UpdateBookDto
        {
            Id = id,
            Title = "new title",
            Pages = 12,
        };
        await service.Update(updatedBook);
        var actual = ctx.Books.First();
        
        Assert.Equal(updatedBook.Title, actual.Title);
        Assert.Equal(updatedBook.Pages, actual.Pages);
    }

    [Fact]
    public async Task UpdateBook_Fail()
    {
        var id = Guid.NewGuid().ToString();
        var updatedBook = new UpdateBookDto
        {
            Id = id,
            Title = "new title",
            Pages = 12,
        };
        
        await Assert.ThrowsAnyAsync<InvalidOperationException>(async () => await service.Update(updatedBook));
    }
}