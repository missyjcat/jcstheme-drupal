<?php
//kpr(get_defined_vars());
//http://drupalcontrib.org/api/drupal/drupal--modules--node--node.tpl.php
//node--article.tpl.php

//to remove all markup around a given field call the nomarkup theme function 
//$content['field_name']['#theme'] = "nomarkup";

if ($classes) {
  $classes = ' class="'. $classes . ' "';
}

if ($id_node) {
  $id_node = ' id="'. $id_node . '"';
}

$hideFieldsArray = [
  'body'
];

foreach ($hideFieldsArray as $field) {
  hide($content[$field]);
}

 // print render($content['field_portfolio_tags']); 
?>

<?php if( theme_get_setting('mothership_poorthemers_helper') ){ ?>
<!-- node.tpl.php -->
<?php } ?>
<article <?php print $id_node . $classes .  $attributes; ?> role="article">
  <?php print $mothership_poorthemers_helper; ?>
  <div class="content">
    <div class="blog darkbg">
      <div class="blog__container">

        <?php print render($title_prefix); ?>
        <h1 class="blog__title"><?php print $title ?></h1>
        <?php print render($title_suffix); ?>
        <div class="blog__date">
          <?php 
            echo 'Posted on ' . gmdate('l, F j, Y', $node->created);
          ?>
        </div>
        <div class="blog__body"><?php print render($content['body']);?></div>

        </div> <!-- /blog__container -->  
    </div> <!-- /blog -->

  </div> <!-- /content -->

  <?php print render($content['comments']); ?>

</article>

<?php if( theme_get_setting('mothership_poorthemers_helper') ){ ?>
<!-- /node.tpl.php -->
<?php } ?>
