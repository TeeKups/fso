import markdown

with open('sequence.md', 'r') as f:
    diagram = f.read()

markdown_html = markdown.markdown(diagram, extensions=['md_mermaid'])

page = f"""
<head>
    <script defer src="mermaid.min.js"></script>
</head>
<body>
{markdown_html}
</body>
"""


with open('index.html', 'w') as f:
    f.write(page)
