(function() {

    this.QuizPlugin = function () {
        let defaults = {
            data: [],
            parentSelector: null,
        };

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        this.init();
    };

    function extendDefaults(source, properties) {
        let property;

        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }

        return source;
    }

    QuizPlugin.prototype.renderWrapper = function () {
        const { parentSelector } = this.options;

        parentSelector.innerHTML = `
            <div class="quiz">
                <div class="quiz-questions"></div>
                <div class="quiz-indicator"></div>
                <div class="quiz-results"></div>
                <div class="quiz-controls">
                    <button class="btn-next" disabled>Далее</button>
                    <button class="btn-restart" >С начала</button>
                </div>
            </div>
        `;

        this.options.selector = {
            quiz: parentSelector.querySelector('.quiz'),
            questions: parentSelector.querySelector('.quiz-questions'),
            indicator: parentSelector.querySelector('.quiz-indicator'),
            results: parentSelector.querySelector('.quiz-results'),
            btnNext: parentSelector.querySelector('.btn-next'),
            btnRestart: parentSelector.querySelector('.btn-restart'),
        }
    }

    QuizPlugin.prototype.renderQuestions = function (index) {
        const { selector, data } = this.options;

        this.renderIndicator(index + 1);
    
        selector.questions.dataset.currentStep = index;
    
        const renderAnswers = () => data[index].answers
            .map((answer) => `
                <li>
                    <label>
                        <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                        ${answer.value}
                    </label>
                </li>
            `)
            .join('');
    
        selector.questions.innerHTML = `
            <div class="quiz-questions-item">
                <div class="quiz-questions-item__question">${data[index].question}</div>
                <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
            </div>
        `;
    };

    QuizPlugin.prototype.renderResults = function () {
        let content = '';
        const { options } = this;
    
        const getClassname = (answer, questionIndex) => {
            let classname = '';
    
            if (!answer.correct && answer.id === options.localResults[questionIndex]) {
                classname = 'answer--invalid';
            } else if (answer.correct) {
                classname = 'answer--valid';
            }
    
            return classname;
        };
    
        const getAnswers = (questionIndex) => options.data[questionIndex].answers
            .map((answer) => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
            .join('');
    
        options.data.forEach((question, index) => {
            content += `
                <div class="quiz-results-item">
                    <div class="quiz-results-item__question">${question.question}</div>
                    <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
                </div>
            `;
        });
    
        options.selector.results.innerHTML = content;
    };

    QuizPlugin.prototype.renderIndicator = function (currentStep) {
        this.options.selector.indicator.innerHTML = `${currentStep}/${this.options.data.length}`;
    };

    QuizPlugin.prototype.addListeners = function () {
        const { selector } = this.options;

        selector.quiz.addEventListener('change', (event) => {
            if (event.target.classList.contains('answer-input')) {
                this.options.localResults[event.target.name] = event.target.value;
                selector.btnNext.disabled = false;
            }
        });
        
        selector.quiz.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-next')) {
                const nextQuestionIndex = Number(selector.questions.dataset.currentStep) + 1;
                
                if (this.options.data.length === nextQuestionIndex) {
                    selector.questions.classList.add('questions--hidden');
                    selector.indicator.classList.add('indicator--hidden');
                    selector.results.classList.add('indicator--visible');
                    selector.btnNext.classList.add('btn-next--hidden');
                    selector.btnRestart.classList.add('btn-restart--visible');
        
                    this.renderResults();
                } else {
                    this.renderQuestions(nextQuestionIndex);
                }
        
                selector.btnNext.disabled = true;
            }
        
            if (event.target.classList.contains('btn-restart')) {
                this.options.localResults = {};
                selector.results.innerHTML = '';
        
                selector.questions.classList.remove('questions--hidden');
                selector.indicator.classList.remove('indicator--hidden');
                selector.results.classList.remove('indicator--visible');
                selector.btnNext.classList.remove('btn-next--hidden');
                selector.btnRestart.classList.remove('btn-restart--visible');
        
                this.renderQuestions(0);
            }
        });
    };

    QuizPlugin.prototype.init = function () {
        const { data, parentSelector } = this.options;

        if (!parentSelector) {
            throw Error(`Элемент ${parentSelector} не найден.`);
        }

        if (!data.length) {
            throw Error(`Нет данных.`);
        }

        this.options.localResults = {};
        this.renderWrapper();
        this.addListeners();
        this.renderQuestions(0);
    };
}());
