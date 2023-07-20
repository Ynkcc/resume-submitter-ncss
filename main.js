// ==UserScript==
// @name         自动投递工作
// @namespace    your-namespace
// @version      1.0
// @description  自动投递工作的油猴脚本，包括统计投递数量、配置参数和输出日志功能。
// @match        https://*.ncss.cn/student/jobs/index.html
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
// 创建UI元素的函数
function createUIElement(elementType, attributes, parent) {
    const element = document.createElement(elementType);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}

// 创建悬浮UI容器
const container = createUIElement('div', {
    id: 'resume-delivery-ui',
    style: 'position: fixed; top: 50px; right: 10px; width: 310px; background-color: rgba(255, 255, 255, 0.8); padding: 10px; border: 1px solid #ccc; z-index: 9999;'
});


// 添加事件处理程序
let isDragging = false;
let initialX, initialY;

container.addEventListener('mousedown', (event) => {
    isDragging = true;
    initialX = event.clientX;
    initialY = event.clientY;
});

container.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        const rect = container.getBoundingClientRect();
        container.style.top = `${rect.top + deltaY}px`;
        container.style.left = `${rect.left + deltaX}px`;
        initialX = event.clientX;
        initialY = event.clientY;
    }
});

container.addEventListener('mouseup', () => {
    isDragging = false;
});



document.body.appendChild(container);

// 第一个部分：投递统计和开/关按钮
const statsContainer = createUIElement('div', { style: 'margin-bottom: 10px;' }, container);
const statsLabel = createUIElement('span', { style: 'margin-right: 5px;' }, statsContainer);
statsLabel.textContent = '当次投递数量：';

const statsCount = createUIElement('span', {}, statsContainer);
statsCount.textContent = '0';

const toggleButton = createUIElement('button', {}, container);
toggleButton.textContent = '开启投递';

// 创建保存配置按钮
const saveButton = createUIElement('button', {}, container);
saveButton.textContent = '保存配置';


// 第二个部分：配置参数
const configContainer = createUIElement('div', { style: 'margin-bottom: 10px;' }, container);
// 创建公司性质容器块
const PropertyTypeContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, configContainer);

// 创建复选框
const PropertyTypeCheckbox = createUIElement('input', { type: 'checkbox' }, PropertyTypeContainer);
// 创建公司性质标签
const PropertyTypeLabel = createUIElement('label', { style: 'display: inline;' }, PropertyTypeContainer);
PropertyTypeLabel.textContent = '公司性质：';

// 创建公司性质选择框
const PropertyTypeSelect = createUIElement('select', {}, PropertyTypeContainer);
createUIElement('option', { value: '国有企业' }, PropertyTypeSelect).textContent = '国有企业';
createUIElement('option', { value: '股份制企业' }, PropertyTypeSelect).textContent = '股份制企业';
createUIElement('option', { value: '民营企业' }, PropertyTypeSelect).textContent = '民营企业';
createUIElement('option', { value: '上市公司' }, PropertyTypeSelect).textContent = '上市公司';
createUIElement('option', { value: '港澳台公司' }, PropertyTypeSelect).textContent = '港澳台公司';
createUIElement('option', { value: '合资企业' }, PropertyTypeSelect).textContent = '合资企业';
createUIElement('option', { value: '外商独资/外企代表处' }, PropertyTypeSelect).textContent = '外商独资/外企代表处';
createUIElement('option', { value: '机关/事业单位/非营利机构' }, PropertyTypeSelect).textContent = '机关/事业单位/非营利机构';
createUIElement('option', { value: '其他' }, PropertyTypeSelect).textContent = '其他';

// 创建容器块
const jobPositionContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, configContainer);

// 创建复选框
const jobPositionCheckbox = createUIElement('input', { type: 'checkbox' }, jobPositionContainer);

// 创建选择框
const jobPositionLabel = createUIElement('label', {}, jobPositionContainer);
jobPositionLabel.textContent = '职位类别：';

const jobPositionSelect = createUIElement('select', {style:'width:180px;'}, jobPositionContainer);
createUIElement('option', { value: '01' },jobPositionSelect).textContent = '计算机/网络/技术类';
createUIElement('option', { value: '02' }, jobPositionSelect).textContent = '电子/电器/通信技术类';
createUIElement('option', { value: '03' }, jobPositionSelect).textContent = '行政/后勤类';
createUIElement('option', { value: '04' }, jobPositionSelect).textContent = '翻译类';
createUIElement('option', { value: '05' }, jobPositionSelect).textContent = '销售类';
createUIElement('option', { value: '06' }, jobPositionSelect).textContent = '客户服务类';
createUIElement('option', { value: '07' }, jobPositionSelect).textContent = '市场/公关/媒介类';
createUIElement('option', { value: '08' }, jobPositionSelect).textContent = '咨询/顾问类';
createUIElement('option', { value: '09' }, jobPositionSelect).textContent = '技工类';
createUIElement('option', { value: '10' }, jobPositionSelect).textContent = '财务/审计/统计类';
createUIElement('option', { value: '11' },jobPositionSelect).textContent = '人力资源类';
createUIElement('option', { value: '12' },jobPositionSelect).textContent = '教育/培训类';
createUIElement('option', { value: '13' },jobPositionSelect).textContent = '质量管理类';
createUIElement('option', { value: '14' },jobPositionSelect).textContent = '美术/设计/创意类';
createUIElement('option', { value: '15' },jobPositionSelect).textContent = '金融保险类';
createUIElement('option', { value: '16' },jobPositionSelect).textContent = '贸易/物流/采购/运输类';
createUIElement('option', { value: '17' },jobPositionSelect).textContent = '经营管理类';
createUIElement('option', { value: '18' },jobPositionSelect).textContent = '商业零售类';
createUIElement('option', { value: '19' },jobPositionSelect).textContent = '建筑/房地产/装饰装修/物业管理类';
createUIElement('option', { value: '20' },jobPositionSelect).textContent = '法律类';
createUIElement('option', { value: '21' },jobPositionSelect).textContent = '酒店/餐饮/旅游/服务类';
createUIElement('option', { value: '22' },jobPositionSelect).textContent = '生物/制药/化工/环保类';
createUIElement('option', { value: '23' },jobPositionSelect).textContent = '文体/影视/写作/媒体类';
createUIElement('option', { value: '24' },jobPositionSelect).textContent = '机械/仪器仪表类';
createUIElement('option', { value: '25' },jobPositionSelect).textContent = '科研类';
createUIElement('option', { value: '26' },jobPositionSelect).textContent = '工厂生产类';
createUIElement('option', { value: '27' },jobPositionSelect).textContent = '医疗卫生/美容保健类';
createUIElement('option', { value: '28' },jobPositionSelect).textContent = '电气/能源/动力类';
createUIElement('option', { value: '29' },jobPositionSelect).textContent = '其他类';



// 创建容器块
const salaryTimeContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 10px;' }, configContainer);

// 创建月薪容器块
const salaryContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-right: 10px;' }, salaryTimeContainer);

// 创建复选框
const salaryCheckbox = createUIElement('input', { type: 'checkbox' }, salaryContainer);

// 创建月薪标签
const salaryLabel = createUIElement('label', {}, salaryContainer);
salaryLabel.textContent = '月薪：';

// 创建月薪选择框
const salarySelect = createUIElement('select', {}, salaryContainer);
createUIElement('option', { value: '2' }, salarySelect).textContent = '2K以下';
createUIElement('option', { value: '2-5' }, salarySelect).textContent = '2K-5K';
createUIElement('option', { value: '5-10' }, salarySelect).textContent = '5K-10K';
createUIElement('option', { value: '10-15' }, salarySelect).textContent = '10K-15K';
createUIElement('option', { value: '15-25' }, salarySelect).textContent = '15K-25K';
createUIElement('option', { value: '25-50' }, salarySelect).textContent = '25K-50K';
createUIElement('option', { value: '50' }, salarySelect).textContent = '50K以上';
createUIElement('option', { value: '0' }, salarySelect).textContent = '面议';

// 创建时间阈值容器块
const timeThresholdContainer = createUIElement('div', { style: 'display: flex; align-items: center;' }, salaryTimeContainer);

// 创建复选框
const timeThresholdCheckbox = createUIElement('input', { type: 'checkbox' }, timeThresholdContainer);

// 创建提示标签
const timeThresholdLabel1 = createUIElement('label', {}, timeThresholdContainer);
timeThresholdLabel1.textContent = '距今：';

// 创建输入框
const timeThresholdInput = createUIElement('input', { style: 'width: 30px; margin-right: 5px;' }, timeThresholdContainer);

// 创建单位标签
const timeThresholdLabel2 = createUIElement('label', {}, timeThresholdContainer);
timeThresholdLabel2.textContent = '小时';



// 启用/黑名单/白名单输入框



// 启用/黑名单/白名单按钮状态
const BUTTON_STATES = {
    DISABLED: '关闭',
    BLACKLIST: '黑名单',
    WHITELIST: '白名单'
};

// 创建启用/黑名单/白名单按钮
function createToggleButton(parent) {
    const button = createUIElement('button', { style: 'margin-left: 5px;' }, parent);
    button.textContent = BUTTON_STATES.DISABLED;
    return button;
}

// 创建关键词过滤部分容器
const keywordsContainer = createUIElement('div', { style: 'margin-bottom: 10px;' }, configContainer);

// 第一组：公司名称关键词
const companyNameContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, keywordsContainer);

const companyNameToggle = createToggleButton(companyNameContainer);
const companyNameInput = createUIElement('input', { type: 'text', placeholder: '公司名称关键词' }, companyNameContainer);

// 第二组：职位名称关键词
const jobTitleContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, keywordsContainer);

const jobTitleToggle = createToggleButton(jobTitleContainer);
const jobTitleInput = createUIElement('input', { type: 'text', placeholder: '职位名称关键词' }, jobTitleContainer);

// 第三组：学历要求关键词
const educationContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, keywordsContainer);

const educationToggle = createToggleButton(educationContainer);
const educationInput = createUIElement('input', { type: 'text', placeholder: '学历要求关键词' }, educationContainer);

// 第四组：工作地点关键词
const jobLocationContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, keywordsContainer);

const jobLocationToggle = createToggleButton(jobLocationContainer);
const jobLocationInput = createUIElement('input', { type: 'text', placeholder: '工作地点关键词' }, jobLocationContainer);

// 第五组：薪资阈值
const salaryThresholdContainer = createUIElement('div', { style: 'display: flex; align-items: center; margin-bottom: 5px;' }, keywordsContainer);

const salaryThresholdToggle = createToggleButton(salaryThresholdContainer);
const salaryThresholdInput = createUIElement('input', { type: 'text', placeholder: '薪资阈值' }, salaryThresholdContainer);





// 示例事件监听
companyNameToggle.addEventListener('click', () => {
    toggleButtonState(companyNameToggle);
});

jobTitleToggle.addEventListener('click', () => {
    toggleButtonState(jobTitleToggle);
});

educationToggle.addEventListener('click', () => {
    toggleButtonState(educationToggle);
});

jobLocationToggle.addEventListener('click', () => {
    toggleButtonState(jobLocationToggle);
});

salaryThresholdToggle.addEventListener('click', () => {
    toggleButtonState(salaryThresholdToggle);
});

// 示例按钮状态切换函数
function toggleButtonState(button) {
    const currentState = button.textContent;
    switch (currentState) {
        case BUTTON_STATES.DISABLED:
            button.textContent = BUTTON_STATES.BLACKLIST;
            break;
        case BUTTON_STATES.BLACKLIST:
            button.textContent = BUTTON_STATES.WHITELIST;
            break;
        case BUTTON_STATES.WHITELIST:
            button.textContent = BUTTON_STATES.DISABLED;
            break;
        default:
            break;
    }
}


// 第三个部分：日志输出
const logContainer = createUIElement('div', { style: 'max-height: 200px; overflow-y: scroll;' }, container);
//日志函数封装
function logMessage(message) {
    const logEntry = createUIElement('div', {}, logContainer);
    logEntry.textContent = message;
}


// 保存配置
function saveConfig() {
    const config = {
        jobPositionEnable: jobPositionCheckbox.checked,
        jobPosition: jobPositionSelect.value,
        PropertyTypeEnable: PropertyTypeCheckbox.checked,
        salaryEnable: salaryCheckbox.checked,
        PropertyType: PropertyTypeSelect.value,
        salary: salarySelect.value,
        timeThresholdEnable:timeThresholdCheckbox.checked,
        timeThreshold:timeThresholdInput.value,
        companyNameToggleState: companyNameToggle.textContent,
        companyNameKeywords: companyNameInput.value,
        jobTitleToggleState: jobTitleToggle.textContent,
        jobTitleKeywords: jobTitleInput.value,
        educationToggleState: educationToggle.textContent,
        educationKeywords: educationInput.value,
        jobLocationToggleState: jobLocationToggle.textContent,
        jobLocationKeywords: jobLocationInput.value,
        salaryThresholdToggleState: salaryThresholdToggle.textContent,
        salaryThresholdValue: salaryThresholdInput.value
    };
    GM_setValue('config', JSON.stringify(config));
    const logEntry = createUIElement('div', {}, logContainer);
    logEntry.textContent='保存成功'

}
// 加载配置
function loadConfig() {
    const savedConfig = GM_getValue('config');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        jobPositionCheckbox.checked = config.jobPositionEnable;
        PropertyTypeCheckbox.checked=config.PropertyTypeEnable;
        salaryCheckbox.checked= config.salaryEnable ;
        timeThresholdCheckbox.checked=config.timeThresholdEnable;
        timeThresholdInput.value=config.timeThreshold;
        jobPositionSelect.value = config.jobPosition;
        PropertyTypeSelect.value = config.PropertyType;
        salarySelect.value = config.salary;
        companyNameToggle.textContent = config.companyNameToggleState;
        companyNameInput.value = config.companyNameKeywords;
        jobTitleToggle.textContent = config.jobTitleToggleState;
        jobTitleInput.value = config.jobTitleKeywords;
        educationToggle.textContent = config.educationToggleState;
        educationInput.value = config.educationKeywords;
        jobLocationToggle.textContent = config.jobLocationToggleState;
        jobLocationInput.value = config.jobLocationKeywords;
        salaryThresholdToggle.textContent = config.salaryThresholdToggleState;
        salaryThresholdInput.value = config.salaryThresholdValue;
    }else {
        logMessage('首次启动，参数填写可参照github示例~');
    }
}
loadConfig();

// 保存配置按钮事件监听
saveButton.addEventListener('click', () => {
    saveConfig();
});

function applyFilter(){
    if(jobPositionCheckbox.checked){
        var tmp1 = document.querySelector("#searchBarBottom > div.jobPosition-box.clearfix > ul > li[data-type='" + jobPositionSelect.value + "']");
        if (tmp1) {
            tmp1.click();
        }
    }
    if(PropertyTypeCheckbox.checked){
        var tmp2 = document.querySelector("#searchBarBottom > div.propertyList-box.clearfix > ul > li[data-type='" + PropertyTypeSelect.value + "']");
        if (tmp2) {
            tmp2.click();
        }
    }
    if(salaryCheckbox.checked){
        var tmp3 = document.querySelector("#content > div > div.position-list > div.select > select.money-area");
        if(tmp3)tmp3.value = salarySelect.value;
    }
}


let isDeliveryRunning = false; // 标志变量，用于表示投递状态
let hasTimeExceededThreshold=false;//标志变量，用于表示是否超出时间阈值

// 辅助函数，用于判断字符串是否包含列表中的任何一个关键词
function hasKeyword(text, keywords) {
    for (var i = 0; i < keywords.length; i++) {
        if (text.includes(keywords[i])) {
            return true;
        }
    }
    return false;
}

// 辅助函数，用于从 "6-8K/月" 格式的字符串中提取最高薪资
function salaryRangeMax(salary) {
    var range = salary.split('-');
    return parseInt(range[1].replace(/[^0-9]/g, ''));
}
// 辅助函数，用于从 "6-8K/月" 格式的字符串中提取最低薪资
function salaryRangeMin(salary) {
    var range = salary.split('-');
    return parseInt(range[0]);
}

// 自动点击投递简历按钮
function apply() {
    var applyButton = document.querySelector("#content > div > div.position-list > div.select > button.btn.btn-primary.bgcolor.multiApply.basic-bg-hv");
    if (applyButton) {
        applyButton.click();
    }
}

// 自动确认投递
function confirmApply() {
    var confirmButton = document.querySelector("#ensureAppyjobMuti > div > div > div.modal-footer > button");
    if (confirmButton) {
        confirmButton.click();
    }
}

// 自动关闭提示
function closeSuccessModal() {
    var closeButton = document.querySelector("#maskSuccess > div > div > div.modal-header > button");
    if (closeButton) {
        closeButton.click();
    }
}

// 跳转到指定页面
function goToPage(page) {
    var pageInput = document.querySelector("#page > input");
    var jumpButton = document.querySelector("#page > a.jump-btn");
    if (pageInput && jumpButton) {
        pageInput.value = page;
        jumpButton.click();
    }
}

// 自动点击下一页按钮
function nextPage() {
    var nextButton = document.querySelector("#page > a.next");
    if (!nextButton) {
        logMessage("到达最后一页")
        return;
    }else nextButton.click();
}



// 定义关键词列表
var companyNameKeywords;
var jobTitleKeywords;
var educationKeywords;
var jobLocationKeywords;
var salaryThreshold ;
// 初始化关键词列表
function initKeywordsList(){
    companyNameKeywords = companyNameInput.value.split(',').map(keyword => keyword.trim());
    jobTitleKeywords = jobTitleInput.value.split(',').map(keyword => keyword.trim());
    educationKeywords = educationInput.value.split(',').map(keyword => keyword.trim());
    jobLocationKeywords = jobLocationInput.value.split(',').map(keyword => keyword.trim());
    salaryThreshold = salaryThresholdInput.value.split(',').map(keyword => keyword.trim());
}



function selectNeed() {
    var localPassedCount=0;
    // 获取所有工作根元素
    var elements = document.getElementsByClassName('row con-list jobList');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var companyName = element.getAttribute('data-corp');
        var jobTitle = element.getAttribute('data-job');
        var education = element.querySelector('div.col-xs-6.job-list-left ul li:nth-child(2)').textContent;
        var salary = element.querySelector('div.col-xs-6.job-list-left ul li:nth-child(2) span').textContent;
        var jobLocation=element.querySelector("div.col-xs-6.job-list-left ul li:nth-child(3)").textContent;
        var publishTime = new Date(element.querySelector('div.col-xs-3.btns div.time-sp').textContent.replace(/\s/g, ' '));

        // 根据要求检查条件，并勾选复选框
        if (
            !(companyNameToggle.textContent === BUTTON_STATES.BLACKLIST && hasKeyword(companyName, companyNameKeywords)) &&
            !(companyNameToggle.textContent === BUTTON_STATES.WHITELIST && !hasKeyword(companyName, companyNameKeywords)) &&
            !(jobTitleToggle.textContent === BUTTON_STATES.BLACKLIST && hasKeyword(jobTitle, jobTitleKeywords)) &&
            !(jobTitleToggle.textContent === BUTTON_STATES.WHITELIST && !hasKeyword(jobTitle, jobTitleKeywords)) &&
            !(educationToggle.textContent === BUTTON_STATES.BLACKLIST && hasKeyword(education, educationKeywords)) &&
            !(educationToggle.textContent === BUTTON_STATES.WHITELIST && !hasKeyword(education, educationKeywords)) &&
            !(jobLocationToggle.textContent === BUTTON_STATES.BLACKLIST && hasKeyword(jobLocation, jobLocationKeywords)) &&
            !(jobLocationToggle.textContent === BUTTON_STATES.WHITELIST && !hasKeyword(jobLocation, jobLocationKeywords)) &&
            (salaryThresholdToggle.textContent === BUTTON_STATES.DISABLED || (salaryThresholdToggle.textContent === BUTTON_STATES.BLACKLIST && parseInt(salaryThresholdInput.value) <= salaryRangeMin(salary)) ||
             (salaryThresholdToggle.textContent === BUTTON_STATES.WHITELIST && parseInt(salaryThresholdInput.value) <= salaryRangeMax(salary))) &&
            (!timeThresholdCheckbox.checked || !timeThresholdInput.value || (new Date() - new Date(publishTime)) / (1000 * 60 * 60) <= parseInt(timeThresholdInput.value))&&
            element.querySelector("div.col-xs-3.btns > div.btn-box > ul").classList.contains('hide')
        ) {
            logMessage('已投递：'+jobTitle)
            var checkbox = element.querySelector('div.col-xs-6.job-list-left div span input');
            checkbox.checked = true;
            // 增加满足条件职位的总数
            statsCount.textContent = parseInt(statsCount.textContent)+1;
            localPassedCount++;
        }

        if (i==(elements.length-1)&&timeThresholdCheckbox.checked && (((new Date() - new Date(publishTime)) / (1000 * 60 * 60)) > parseInt(timeThresholdInput.value))) {
            logMessage("到达时间阈值，稍后返回第一页重新寻找");
            // logMessage(new Date())
            // logMessage(new Date(publishTime))
            // logMessage((new Date() - new Date(publishTime))/(1000 * 60 * 60))
            hasTimeExceededThreshold=true;
        }
    }
    if(localPassedCount==0){
        return false;}
    else return true;
}


function submitResume() {
    setTimeout(function() {
        if (selectNeed()) {
            apply()
            confirmApply();
            closeSuccessModal();
        }
        if(!isDeliveryRunning)return;
        if(hasTimeExceededThreshold){
            goToPage(1);
            hasTimeExceededThreshold=false;}else nextPage();
        submitResume();
    }, 2000);
}


// 示例事件监听
toggleButton.addEventListener('click', () => {
    if (toggleButton.textContent === '开启投递') {
        isDeliveryRunning = true; // 将投递状态设置为运行中
        applyFilter();
        initKeywordsList();
        submitResume();
        toggleButton.textContent = '关闭投递';
    } else {
        toggleButton.textContent = '开启投递';
        isDeliveryRunning = false; // 将投递状态设置为停止
    }
});
