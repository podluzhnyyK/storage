$(function() {
    function count () {
        const total = Number($('#total-length').val()) * 100;
        let usedPerDay = 0;
        let result = 0;

        $('.form-group__control-input', '#users-list').each(function(index, item) {
            usedPerDay = usedPerDay + Number($(item).val());
        });
        
        if ($('.form-group__control-button--active').data('type') === 'paper') {
            const papersCount = total / Number($('#paper-length').val());
            result = papersCount / usedPerDay;
        } else {
            result = total / usedPerDay;
        }

        $('#days').html(result.toFixed(0));
    }

    function generateUsers () {
        $('#users-list').empty();

        const currentType = $('.form-group__control-button--active').data('type') === 'paper' ?
            { unit: 'листочков', defaultValue: '1' } :
            { unit: 'см', defaultValue: '10' }

        for (let i = 1; i <= $('#users-count').val(); i++) {
            $('#users-list').append(`
                <div class="form-group form-group--inline">
                    <div class="form-group__label">Человек ${i} (${currentType.unit})</div>
                    <div class="form-group__control">
                        <input class="form-group__control-input" type="text" value=${currentType.defaultValue} />
                    </div>
                </div>
            `);
        }

        count ();
    }

    $('#total-length').blur(count);
    $('#paper-length').blur(count);
    $('#users-count').blur(generateUsers);

    $('body').on('change', '#users-list .form-group__control-input', function() {
        count();
    });

    $('.form-group__control-button').click(function() {
        $(this)
            .addClass('form-group__control-button--active')
            .siblings()
            .removeClass('form-group__control-button--active');

        if ($(this).data('type') === 'paper') {
            $('#paper-length-group').removeClass('hidden');
        } else {
            $('#paper-length-group').addClass('hidden');
        }

        generateUsers ();
    });

    generateUsers ();
    count ();
});
