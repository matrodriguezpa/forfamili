// scripts/build.js
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();

const postsDir = path.join(__dirname, '../posts');
const outDir = path.join(__dirname, '../');

// Read all markdown files in posts directory
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const posts = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const match = content.match(/---([\s\S]+?)---([\s\S]*)/);
    if (!match) {
        console.warn(`Skipping file without front matter: ${file}`);
        return;
    }

    const [, front, body] = match;
    const meta = front.split("\n").reduce((acc, line) => {
        // Skip empty lines
        if (!line.trim()) return acc;

        // Handle lines without colon
        if (!line.includes(':')) {
            console.warn(`Skipping invalid front matter line: ${line}`);
            return acc;
        }

        const parts = line.split(':');
        const key = parts[0].trim();
        // Join remaining parts in case value contains colons
        const rawVal = parts.slice(1).join(':').trim();

        // Handle undefined values
        const val = rawVal ? rawVal.replace(/"/g, '').trim() : '';

        acc[key] = val;
        return acc;
    }, {});

    // Ensure meta fields exist
    const title = meta.title || 'Untitled';
    const date = meta.date || '1970-01-01';

    const html = md.render(body);
    const slug = file.replace('.md', '');
    const preview = body.split('\n')[0];

    posts.push({ slug, title, date, preview });

    // Write individual post JSON
    fs.writeFileSync(
        path.join(outDir, `posts/${slug}.json`),
        JSON.stringify({ title, date, body: html }, null, 2)
    );
});

// Write posts index
fs.writeFileSync(
    path.join(outDir, 'posts.json'),
    JSON.stringify(posts, null, 2)
);
