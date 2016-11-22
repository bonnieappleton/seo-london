$(document).ready(function ($) {

  $('.slider').unslider({
    animation: 'horizontal'
  });

  $('.ui.accordion')
    .accordion({
      selector: {
        trigger: '.title'
      }
    });

  $('.menu .item')
    .tab()
  ;

  $('.success.story.button').click(function() {
    var storyId = $(this).data('story');
    $('.success.story.modal.'+storyId).modal('show');
  });

  $('.apply-button').click(function() {
    $('.apply.modal').modal('show');
  });

  // open second modal on first modal buttons
  let $donateEl = $('.donate.modal');

if ($donateEl.length) {
    $donateEl.modal('attach events', '.donate-modal.button');
}

  // $('.ui.dropdown').dropdown();

  var eligibilityBackground = 0;
  var eligibilityArea = 0;
  var selectionBackground = 0;

  var eligibilityBools = [
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [false, true, true, true, false, false, false, false],
    [true, true, true, true, true, true, true, false],
    [false, true, false, false, false, false, false, true],
    [true, false, true, false, true, false, false, false],
    [false, false, false, true, false, false, false, false]
  ];

  $('.ui.dropdown.eligibility.test').dropdown(
    {
      action: 'activate',
      onChange: function(value) {
        eligibilityBackground = value;
      }
    }
  );

  $('.ui.dropdown.eligibility.area').dropdown(
    {
      action: 'activate',
      onChange: function(value) {
        eligibilityArea = value;

        if (eligibilityBackground > 0) {
          if (eligibilityBools[eligibilityBackground][eligibilityArea]) {
            $('.eligible-toggle').css('visibility', 'visible');
          } else {
            $('.eligible-toggle').css('visibility', 'hidden');
          }
        }
      }
    }
  );

  $('.ui.dropdown.selection.background').dropdown(
    {
      action: 'activate',
      onChange: function(value) {
        $('*[data-selection-process="'+selectionBackground+'"]').hide();
        selectionBackground = value;
        $('*[data-selection-process="'+selectionBackground+'"]').show();
      }
    }
  );

  $('#navigation-bar li li.child:contains("FAQ")').css("border-top", "3px solid #105f9b");

  $('#navigation-bar li a:contains("About Us")').parent().append(
    "<ul>" +
    "<li class='child'><a href='#our-story'>Our Story</a></li>" +
    "<li class='child'><a href='#today'>Today</a></li>" +
    "<li class='child'><a href='#team'>Team</a></li>" +
    "<li class='child'><a href='#board'>Board</a></li>" +
    "</ul>"
  );

  $("#scroll-to-top").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 200)  {
      $("#scroll-to-top").addClass('visible');
    } else {
      $("#scroll-to-top").removeClass('visible');
    }
  });
});



/**
 * JavaScript for the header and navigation
 * @class Header
 */
class Header {
  constructor(navbarId, headerId) {
    this.$navbar = $(navbarId);
    this.$header = $(headerId);
    this.$mobileToggle = this.$navbar.find('.mobile.toggle a');
    this.$mobileMenu = this.$navbar.children('.ui.mobile.container');
    this.$window = $(window);
    this.scrolling = false;
    this.lastScrollPosition = 9999999;
    this.menuLastToggled = new Date(0);

    this.bind();
    if (this.$window.scrollTop() >= 200) {
      this.$navbar.addClass('slide-down');
    }
  }

  /**
   * Bind the header to scroll and toggle events
   */
  bind() {
    //this.$window.scroll(this.scroll.bind(this));

    this.$window.resize(() => {
      if (this.$navbar.hasClass('mobile open') && this.$window.width() >= 768) {
        this.closeMobileMenu();
      }
    });

    this.$mobileToggle.click(this.toggleMobileMenu.bind(this));

    this.$mobileMenu.find('.menu-item-has-children').click((e) => {
      const $link = $(e.target).closest('.menu-item-has-children');
      const $menu = $link.children('ul');

      if (!$menu.hasClass('open')) {
        this.$mobileMenu.find('.menu-item-has-children ul').not($menu).slideUp(300).removeClass('open');
        $menu.slideDown(300).addClass('open');
        e.preventDefault();
      }
    });
  }
  /**
   * Show/hide the mobile menu
   */
  toggleMobileMenu() {
    const now = new Date();

    // debouncing
    if (now.getTime() - 700 < this.menuLastToggled.getTime()) {
      return false;
    } else {
      this.menuLastToggled = new Date();
    }

    // toggling
    if (this.$navbar.hasClass('mobile open')) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Open the mobile menu and handle animations
   */
  openMobileMenu() {
    $('.mobile.slice').addClass('active');
    this.$navbar.addClass('mobile open');
    $('body').addClass('mobile open');

    setTimeout(() => {
      this.$navbar.find('.ui.mobile.container').fadeIn(350);
    }, 300);
  }

  /**
   * Close the mobile menu, handling animations
   */
  closeMobileMenu() {
    this.$mobileMenu.find('.menu-item-has-children ul').slideUp(300).removeClass('open');
    this.$navbar.find('.ui.mobile.container').fadeOut(300);
    $('body').removeClass('mobile open');

    setTimeout(() => {
      this.$navbar.removeClass('mobile open');
      $('.mobile.slice').removeClass('active');
    }, 300);
  }
}

$(document).ready(() => new Header('#navigation-bar', '#masthead'));
