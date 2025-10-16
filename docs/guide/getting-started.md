# Getting started

## How to enable the toolbar

For the toolbar to load correctly you need to have at least the basic HTML structure present on the page as the toolbar will be injected at the beginning of the body tag.

::: code-group

```twig[index.twig]
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- Author toolbar -->

		<!-- Your page content -->
	</body>
</html>
```

:::

::: warning
The current version of the toolbar is not compatible with the <u>**blitz caching plugin**</u> because it's not injected via JS. Native cache tags will also cause unwanted behaviours.
:::

If all this is done and the enable author toolbar setting on the `Author toolbar > Settings` page is enabled it should load correctly

### Permissions
