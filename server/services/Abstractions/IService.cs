namespace services.Abstractions;

// Rename ? -> reposity designpattern?
/// <summary>
/// Repository abstraction
/// </summary>
/// <typeparam name="TRes">Response type</typeparam>
/// <typeparam name="TCreate">Create type</typeparam>
/// <typeparam name="TUpdate">Update type</typeparam>
public interface IService<TRes, in TCreate, in TUpdate>
{
    public Task<List<TRes>> Get();
    public Task<TRes> Get(string id);

    public Task<TRes> Create(TCreate request);
    public Task<TRes> Update(TUpdate request);
    public Task<TRes> Delete(string id);
}