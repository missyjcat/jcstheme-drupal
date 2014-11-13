<?php
//kpr(get_defined_vars());
//http://drupalcontrib.org/api/drupal/drupal--modules--node--node.tpl.php
//node--portfolio_piece.tpl.php

//to remove all markup around a given field call the nomarkup theme function 
//$content['field_name']['#theme'] = "nomarkup";

if ($classes) {
  $classes = ' class="'. $classes . ' "';
}

if ($id_node) {
  $id_node = ' id="'. $id_node . '"';
}

$hideFieldsArray = [
  'comments',
  'links',
  'field_live_link',
  'body',
  'field_image',
  'field_portfolio_tags'
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
    <div class="portdetail darkbg">
      <div class="portdetail__container">
        <?php print render($title_prefix); ?>
        <h1 class="portdetail__title"><?php print $title ?></h1>
        <?php print render($title_suffix); ?>
        <div class="portdetail__tags"><?php print render($content['field_portfolio_tags']); ?></div>
        <div class="portdetail__body"><?php print render($content['body']);?></div>
        <div class="portdetail__livelink">
          <?php
            if (isset($content['field_live_link'][0])) { ?>
              <span class="portdetail__livelink__label">live link:</span> <a class="portdetail__livelink__link" href="<?php print render($content['field_live_link'][0]['#markup']); ?>" target="_blank"><?php print render($content['field_live_link'][0]['#markup']); ?></a>
          <?php } ?></div>
        </div> <!-- /portdetail__container -->  
    </div> <!-- /portdetail -->
  
    <div class="portimages">
      <div class="portimages__container">
        <?php print render($content['field_image']); ?>
      </div>
    </div>


  </div> <!-- /content -->

</article>

<?php if( theme_get_setting('mothership_poorthemers_helper') ){ ?>
<!-- /node.tpl.php -->
<?php } ?>
