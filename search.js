/*
假设已经存在一个二叉树,通过二叉树的查找来得到一个数据是否存在

请在is_data_in_tree中添加二叉树查找数据的代码，函数的参数是要查找的数据，
如果数据存在返回数据的节点对象，如果数据不存在返回null。
*/

function BinaryTreeNode(data, left, right)
{
    this.data = data;
    this.left = left;
    this.right = right;
    return this;
}

function BinaryTree()
{
    this.root = null;
}

BinaryTree.prototype.is_data_in_tree = function(data)
{
    //在这里写入代码
    var ans;
    function search(node){
        if(node!==null){
            if(node.data==data){
            	ans=node;
            }
            else{
            	search(node.left);
                search(node.right);
            }
        }
    }
    search(this.root);
    if(ans){
        return ans;
    }
    else{
    	return null;
    }
};
