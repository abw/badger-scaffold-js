## Notes for Maintainers

Check out the repository.

```bash
$ git clone https://github.com/{{githubId}}/{{name}}.git
$ cd {{name}}
```

Install the dependencies.

```bash
$ {{manager}} install
```
{% for name, script in scripts %}
{{script.about}}

```bash
$ {{manager}} {{name}}
```
{% endfor %}