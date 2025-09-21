using dataaccess;
using Org.BouncyCastle.Asn1.X509;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests.BookTests;

public class GetBooks(MyDbContext ctx, IService<BaseBookResponse, CreateBookDto, UpdateBookDto> service)
{
    [Fact]
    public async Task GetAllBooks_Test()
    {
        var book = new Book
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test",
            Pages = 11,
            Authors = new List<Author>(),
            Createdat = DateTime.UtcNow,
        };
        var book1 = new Book
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test",
            Pages = 11,
            Authors = new List<Author>(),
            Createdat = DateTime.UtcNow,
        };
        ctx.Books.Add(book);
        ctx.Books.Add(book1);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        var list = await service.Get();
        Assert.Equal(2, list.Count);

    }
}