using System.Diagnostics;
using dataaccess;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests.BookTests;

public class DeleteBook(MyDbContext ctx, IService<BaseBookResponse, CreateBookDto, UpdateBookDto> service)
{
    [Fact]
    public async Task DeleteBookTest_ValidID()
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

        var response = await service.Delete(id);
        Assert.NotNull(response);
        Assert.Equal(id, response.Id);
        Assert.False(ctx.Books.Any());
    }

    [Fact]
    public async Task DeleteBookTest_InvalidID()
    {
       await Assert.ThrowsAnyAsync<InvalidOperationException>(async () => await service.Delete(Guid.NewGuid().ToString()));
    }
}