using System.ComponentModel.DataAnnotations;
using dataaccess;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests.BookTests;

public class CreateBookTests(MyDbContext ctx, IService<BaseBookResponse, CreateBookDto, UpdateBookDto> service)
{
    [Theory]
    [InlineData("James", 1)] // page count edge case
    [InlineData("L", 1000)] // title edge case
    [InlineData("Karl is a good boy", 42)] // normal example
    public async Task CreateBook_WithNoValidationErrors_NoAuthorsOrGenre(string title, int pages)
    {
        var newBookDto = new CreateBookDto
        {
            Title = title,
            Pages = pages
        };

        var actual = await service.Create(newBookDto);
        
        Assert.NotNull(actual);
        Assert.True(actual.Id.Length > 5);
        Assert.True(actual.Title == newBookDto.Title);
        Assert.True(actual.Pages == newBookDto.Pages);
        Assert.Null(actual.Genreid);
        Assert.Empty(actual.AuthorsIDs);
        Assert.True(actual.CreateAt < DateTime.UtcNow);
        
    }

    [Theory]
    [InlineData("", 1)] // title exceptions
    [InlineData("Lars", 0)] // page exceptions
    [InlineData("", 0)] // title and page exceptions
    public async Task CreateBook_WithValidationErrors_ExpectedExceptions_NoAuthorsOrGenre(string title, int pages)
    {
        var newBookDto = new CreateBookDto
        {
            Title = title,
            Pages = pages
        };
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.Create(newBookDto));
    }
    
    [Fact(Skip = "Not implemented yet")]
    public void CreateBook_WithNoValidationErrors_WhereBookHasMultipleAuthorsAndGenre()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public void CreateBook_WithValidationErrors_ExpectedExceptions_WithAuthorsOrGenre()
    {
        
    }
}