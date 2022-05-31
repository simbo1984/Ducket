# Ducket v0.0.2

## What is Ducket?

Ducket is a Chrome Extension that uses a Markdown file to generate a tree structure of websites and pages (sort of like a bookmarks management application).

[Download the extension here](https://chrome.google.com/webstore/detail/ducket-ce/hfckpmjeceejjjlfckofdgihpljhbkic?hl=fr)

### How does it work?

As of now, Ducket is made to work with files hosted on Git repos of Azure DevOps Services (dev.azure.com). So, as long as there's a markdown file on some Git repo of your Azure DevOps organization, you'll be able to use it.

You just need to generate a personnal access token (PAT) with sufficient access (`Code - Read` is the only scope required).

The markdown file can be of any name but needs to comply to a few requirements:

- The heading syntax (`#, ##, ###, ...`) is used to define a folder (and thus, its level). In example, one hashtag is the equivalent of a folder on level one.
- The link syntax (`[title](https://www.example.com)`) is used to define a link. Its level matches the first available preceding header. Any non-whitespace character after the closing parenthesis is ignored.
- The file must be clean of anything else or it won't work.

Here's an example :

Markdown file :
```
  # Folder A
  [link-A](https://www.example.com)<br>
  [link-B](https://www.example.com)<br>
  ## Sub-Folder A
  [link-C](https://www.example.com)<br>
  # Folder B
  [link-D](https://www.example.com)<br>
```

Would result in :

```
Folder A
| Link-A
| Link-B
| Sub-Folder A
| | Link-C
Folder B
| Link-D
```

## How to contribute :

### Installation procedure:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load the extension on Chrome following these steps:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
6. Start coding.

### Webpack auto-reload and HRM

This project uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) for development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

### Packing

After development is done, run the command:

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)

## Contributions

- Thanks to Michael Xieyang Liu ([his website](https://lxieyang.github.io)) for the boilerplate used in this project : [Chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react);
- [Duck](https://thenounproject.com/icon/duck-3416068/) icon by Minus Icons from [The Noun Project](https://thenounproject.com/);
- [Concert One](https://fonts.google.com/specimen/Concert+One?query=concert+one) font by [Johan Kallas](https://fonts.google.com/?query=Johan%20Kallas) and [Mihkel Virkus](https://fonts.google.com/?query=Mihkel%20Virkus);
- [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans?query=nunito+sans) font by [Vernon Adams](https://fonts.google.com/?query=Vernon%20Adams), [Jacques Le Bailly](https://fonts.google.com/?query=Jacques%20Le%20Bailly), [Manvel Shmavonyan](https://fonts.google.com/?query=Manvel%20Shmavonyan) and [Alexei Vanyashin](https://fonts.google.com/?query=Alexei%20Vanyashin).

---

Bruno Simard | [Website](https://github.com/simbo1984)
