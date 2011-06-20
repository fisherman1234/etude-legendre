class ConsignationLinesController < ApplicationController
  # GET /consignation_lines
  # GET /consignation_lines.xml
  def index
    @consignation_lines = ConsignationLine.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @consignation_lines }
    end
  end

  # GET /consignation_lines/1
  # GET /consignation_lines/1.xml
  def show
    @consignation_line = ConsignationLine.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @consignation_line }
    end
  end

  # GET /consignation_lines/new
  # GET /consignation_lines/new.xml
  def new
    @consignation_line = ConsignationLine.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @consignation_line }
    end
  end

  # GET /consignation_lines/1/edit
  def edit
    @consignation_line = ConsignationLine.find(params[:id])
  end

  # POST /consignation_lines
  # POST /consignation_lines.xml
  def create
    @consignation_line = ConsignationLine.new(params[:consignation_line])

    respond_to do |format|
      if @consignation_line.save
        format.html { redirect_to(@consignation_line, :notice => 'Consignation line was successfully created.') }
        format.xml  { render :xml => @consignation_line, :status => :created, :location => @consignation_line }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @consignation_line.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /consignation_lines/1
  # PUT /consignation_lines/1.xml
  def update
    @consignation_line = ConsignationLine.find(params[:id])

    respond_to do |format|
      if @consignation_line.update_attributes(params[:consignation_line])
        format.html { redirect_to(@consignation_line, :notice => 'Consignation line was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @consignation_line.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /consignation_lines/1
  # DELETE /consignation_lines/1.xml
  def destroy
    @consignation_line = ConsignationLine.find(params[:id])
    @consignation_line.destroy

    respond_to do |format|
      format.html { redirect_to(consignation_lines_url) }
      format.xml  { head :ok }
    end
  end
end
