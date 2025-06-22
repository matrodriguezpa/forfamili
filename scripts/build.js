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
        if (!line.trim()) return acc;
        if (!line.includes(':')) {
            console.warn(`Skipping invalid front matter line: ${line}`);
            return acc;
        }

        const parts = line.split(':');
        const key = parts[0].trim();
        const rawVal = parts.slice(1).join(':').trim();
        const val = rawVal ? rawVal.replace(/"/g, '').trim() : '';

        // Parse list for tags
        if (val.startsWith('[') && val.endsWith(']')) {
            try {
                acc[key] = JSON.parse(val);
            } catch {
                acc[key] = val;
            }
        } else {
            acc[key] = val;
        }

        return acc;
    }, {});

    const title = meta.title || 'Untitled';
    const date = meta.date || '1970-01-01';
    const author = meta.author || 'Anónimo';
    const tags = meta.tags || [];
    const cover = meta.cover || null;

    const html = md.render(body);
    const slug = file.replace('.md', '');
    const previewText = body.split('\n').find(l => l.trim()) || '';

    posts.push({ slug, title, date, author, previewText, cover });

    // Write individual post JSON
    fs.writeFileSync(
        path.join(outDir, `posts/${slug}.json`),
        JSON.stringify({ slug, title, date, author, tags, cover, body: html }, null, 2)
    );
});

// Write posts index
fs.writeFileSync(
    path.join(outDir, 'posts.json'),
    JSON.stringify(posts, null, 2)
);
