using System.ComponentModel.DataAnnotations;
using dataaccess;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests;

public class AuthorTests(MyDbContext ctx, IService<BaseAuthorResponse, CreateAuthorDto, UpdateAuthorDto> service)
{
    [Theory]
    [InlineData("A")] // Edge case
    [InlineData("Jens Kurtsen")] // Not edge case
    public async Task CreateAuthor_Success(string name)
    {
        var newA = new CreateAuthorDto
        {
            Name = name
        };
        
        var response = await service.Create(newA);
        Assert.Equal(1, ctx.Authors.Count());
        Assert.Equal(name, response.Name);
        Assert.True(response.Id.Length > 0);
        Assert.True(response.CreateAt < DateTime.UtcNow);
    }

    [Theory]
    [InlineData("")] // invalid name
    [InlineData(null)]
    public async Task CreateAuthor_Fail(string name)
    {
        var newA = new CreateAuthorDto
        {
            Name = name
        };
        await Assert.ThrowsAnyAsync<Exception>(async () => await service.Create(newA));
    }

    [Fact]
    public async Task UpdateAuthor_Success()
    {
        var a = CreateAuthor("TestName");
        ctx.Authors.Add(a);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Authors.Count());

        var updatedAuthorDto = new UpdateAuthorDto
        {
            Id = a.Id,
            Name = "New name"
        };
        var response = await service.Update(updatedAuthorDto);
        Assert.Equal(1, ctx.Authors.Count());
        Assert.Equal(updatedAuthorDto.Name, response.Name);
    }

    [Fact]
    public async Task UpdateAuthor_Fail()
    {
        var a = CreateAuthor("TestName");
        ctx.Authors.Add(a);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Authors.Count());

        var updatedAuthorDto = new UpdateAuthorDto
        {
            Id = a.Id,
            Name = ""
        };
        
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.Update(updatedAuthorDto));
    }

    public async Task DeleteAuthor_Success()
    {
        var a = CreateAuthor("TestName");
        ctx.Authors.Add(a);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Authors.Count());

        await service.Delete(a.Id);
        
        Assert.Equal(0, ctx.Authors.Count());
    }

    [Fact]
    public async Task DeleteAuthor_Fail()
    {
        await Assert.ThrowsAnyAsync<Exception>(async () => await service.Delete(Guid.NewGuid().ToString()));
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task DeleteAuthor_CascadeOnDelete()
    {
        
    }

    [Fact]
    public async Task GetAllAuthors()
    {
        var a1 = CreateAuthor("TestName");
        var a2 = CreateAuthor("TestName2");
        
        ctx.Authors.Add(a1);
        ctx.Authors.Add(a2);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        Assert.Equal(2, ctx.Authors.Count());
        // fetch
        var list = await service.Get();
        Assert.Equal(2, list.Count);
    }
    private Author CreateAuthor(string name)
    {
        return new Author
        {
            Id = Guid.NewGuid().ToString(),
            Name = name,
            Createdat = DateTime.UtcNow,
            Books = new List<Book>()
        };
    }
}