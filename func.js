let expr             = ""
let num1             = ""
let num2             = ""
let op_index         = ""
let op               = ""
let num_pattern      = "^[0-9]+((\\.[0-9]+[+\\-*/])|([+\\-*/]))((\\.[0-9]+=)|([0-9]+(\\.[0-9]+)?=))$";
let plus_pattern1    = "\\+[0-9]+((\\.[0-9]+[+\\-*/])|([+\\-*/]))((\\.[0-9]+=)|([0-9]+(\\.[0-9]+=)?=))";
let plus_pattern2    = "(\\+\\.[0-9]+[+\\-*/][0-9]+(\\.[0-9]+)?=)|(\\+\\.[0-9]+[+\\-*/]\\.[0-9]+=)";
let sub_pattern1     = "\\-[0-9]+((\\.[0-9]+[+\\-*/])|([+\\-*/]))((\\.[0-9]+=)|([0-9]+(\\.[0-9]+=)?=))";
let sub_pattern2     = "(\\-\\.[0-9]+[+\\-*/][0-9]+(\\.[0-9]+)?=)|(\\-\\.[0-9]+[+\\-*/]\\.[0-9]+=)";
let dot_pattern      = "(\\.[0-9]+[+\\-*/][0-9]+(\\.[0-9]+)?=)|(\\.[0-9]+[+\\-*/]\\.[0-9]+=)";


function math_expr(char){
      expr+=char
      $('#led-text').html(expr)
}


function result_show(num1,num2,op){
   if(num2==0&&op=='/'){
      $('#led-text').html('division by zero')
   }

   else{
      switch (op) {
         case '-':
            $('#led-text').html(num1-num2)
            break;
         case '+':
            $('#led-text').html(num1+num2)
            break;
         case '*':
            $('#led-text').html(num1*num2)
            break;
         case '/':
            $('#led-text').html(num1/num2)
         default:
            break;
      }
   }
}


function num_pattern_handler(){
   for (let i = 0; i < expr.length; i++) {
      if((expr[i]-'0'>=0&&expr[i]-'0'<=9)||(expr[i]=='.'))
         num1+=expr[i]
      else{
        op_index=i
        break 
      }
   }
   for (let i = op_index+1; i < expr.length; i++) {
      if(expr[i]!='=')
         num2+=expr[i]
   }
   op=expr[op_index]
   num1=parseFloat(num1)
   num2=parseFloat(num2)
   result_show(num1,num2,op)
}

function plus_pattern_handler(){
   for (let i = 1; i < expr.length; i++) {
      if((expr[i]-'0'>=0&&expr[i]-'0'<=9)||(expr[i]=='.'))
         num1+=expr[i]
      else{
        op_index=i
        break 
      }
   }
   for (let i = op_index+1; i < expr.length; i++) {
      if(expr[i]!='=')
         num2+=expr[i]
   }
   op=expr[op_index]
   num1=parseFloat(num1)
   num2=parseFloat(num2)
   result_show(num1,num2,op)
}

function sub_pattern_handler(){
   for (let i = 1; i < expr.length; i++) {
      if((expr[i]-'0'>=0&&expr[i]-'0'<=9)||(expr[i]=='.'))
         num1+=expr[i]
      else{
        op_index=i
        break 
      }
   }
   for (let i = op_index+1; i < expr.length; i++) {
      if(expr[i]!='=')
         num2+=expr[i]
   }
   op=expr[op_index]
   num1=parseFloat(num1)*-1
   num2=parseFloat(num2)
   result_show(num1,num2,op)
}



function equal_press(){
   expr+='='
   if(expr.match(num_pattern)||expr.match(dot_pattern)){
      num_pattern_handler()
   }
   else if (expr.match(plus_pattern1)||expr.match(plus_pattern2)) {
     plus_pattern_handler()
   }
   else if (expr.match(sub_pattern1)||expr.match(sub_pattern2)) {
      sub_pattern_handler()
   }
   else{
      $('#led-text').html('error')
   }
}