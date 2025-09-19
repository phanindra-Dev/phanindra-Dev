const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
  test('GET request to JSONPlaceholder API', async ({ request }) => {
    // Test a reliable public API
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
    expect(data).toHaveProperty('userId');
  });

  test('GET request to get all posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    
    // Check first post structure
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('POST request to create a new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post from Playwright',
      body: 'This is a test post created by Playwright API testing',
      userId: 1
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });

    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
  });

  test('PUT request to update a post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated Test Post',
      body: 'This post has been updated via Playwright API testing',
      userId: 1
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updatedPost
    });

    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData.title).toBe(updatedPost.title);
    expect(responseData.body).toBe(updatedPost.body);
  });

  test('DELETE request to remove a post', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
  });

  test('API response headers validation', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});