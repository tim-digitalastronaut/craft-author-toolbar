<?php

namespace digitalastronaut\craftauthortoolbar\web\twig;

use Craft;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AuthorToolbarTwigExtension extends AbstractExtension {
    public function getFunctions(): array {
        return [
            new TwigFunction('getStaticTranslations', [$this, 'getStaticTranslations']),
        ];
    }

    public function getStaticTranslations($language = 'en') {
        $file = Craft::getAlias("@digitalastronaut/craftauthortoolbar/translations/{$language}/author-toolbar.php");

        if (!file_exists($file)) $file = Craft::getAlias("@digitalastronaut/craftauthortoolbar/translations/en/author-toolbar.php");

        return file_exists($file) ? require $file : [];
    }
}